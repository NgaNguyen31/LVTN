import React from 'react';
import { connect } from 'react-redux';
import { getAll, createCategory, swapCategory, updateCategory, deleteCategory } from './redux/category.jsx'
import ImageBox from './ImageBox.jsx';

class CategoryModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.show = this.show.bind(this);
        this.save = this.save.bind(this);

        this.modal = React.createRef();
        this.imageBox = React.createRef();
        this.btnSave = React.createRef();
    }

    componentDidMount() {
        $(document).ready(() => {
            setTimeout(() => {
                $(this.modal.current).on('shown.bs.modal', () => $('#catName').focus());
            }, 250);
        });
    }

    show(item, categoryType) {
        const { _id, title, image } = item ? item : { _id: null, title: '', image: '/img/avatar.jpg' };
        $('#catName').val(title);
        $(this.btnSave.current).data('id', _id).data('categoryType', categoryType);

        this.setState({ image });
        this.imageBox.current.setData(this.props.uploadType + ':' + (_id ? _id : 'new'));

        $(this.modal.current).modal('show');
    }

    save(e) {
        e.preventDefault();
        const btnSave = $(this.btnSave.current),
            _id = btnSave.data('id'),
            changes = { title: $('#catName').val().trim() };

        if (_id) { // Update
            this.props.updateCategory(_id, changes, () => $(this.modal.current).modal('hide'));
        } else { // Create
            changes.type = btnSave.data('categoryType');
            changes.active = false;
            this.props.createCategory(changes, () => $(this.modal.current).modal('hide'));
        }
    }

    render() {
        return (
            <div className='modal' tabIndex='-1' role='dialog' ref={this.modal}>
                <form className='modal-dialog' role='document' onSubmit={this.save}>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <h5 className='modal-title'>Category</h5>
                            <button type='button' className='close' data-dismiss='modal' aria-label='Close'>
                                <span aria-hidden='true'>&times;</span>
                            </button>
                        </div>
                        <div className='modal-body'>
                            <div className='form-group'>
                                <label htmlFor='catName'>Tên</label>
                                <input className='form-control' id='catName' type='text' placeholder='Tên' />
                            </div>
                            <div className='form-group'>
                                <label>Avatar</label>
                                <ImageBox ref={this.imageBox} postUrl='/admin/upload' uploadType='CategoryImage' image={this.state.image} />
                            </div>
                        </div>
                        <div className='modal-footer'>
                            <button type='button' className='btn btn-secondary' data-dismiss='modal'>Close</button>
                            <button type='button' className='btn btn-primary' ref={this.btnSave} onClick={this.save}>Save</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

class Category extends React.Component {
    constructor(props) {
        super(props);
        this.modal = React.createRef();

        this.getData = this.getData.bind(this);
        this.create = this.create.bind(this);
        this.changeActive = this.changeActive.bind(this);
        this.swap = this.swap.bind(this);
        this.delete = this.delete.bind(this);
    }

    componentDidMount() {
        $(document).ready(() => {
            T.selectMenu(4, 1);
            this.getData();
        });
    }

    getData() {
        this.props.getAll(this.props.type);
    }

    create(e) {
        this.modal.current.show(null, this.props.type);
        // this.props.createCategory(this.props.type, data => this.modal.current.show(data.item));
        e.preventDefault();
    }

    edit(e, item) {
        this.modal.current.show(item);
        e.preventDefault();
    }

    swap(e, item, isMoveUp) {
        this.props.swapCategory(item._id, isMoveUp, this.props.type);
        e.preventDefault();
    }

    changeActive(item) {
        this.props.updateCategory(item._id, { active: !item.active });
    }

    delete(e, item) {
        T.confirm('Delete category', 'Are you sure you want to delete this category?', true, isConfirm =>
            isConfirm && this.props.deleteCategory(item._id)
        );
        e.preventDefault();
    }

    render() {
        let table = null;
        if (this.props.category && this.props.category.length > 0) {
            table = (
                <table className='table table-hover table-bordered'>
                    <thead>
                        <tr>
                            <th style={{ width: '80%' }}>Tên</th>
                            <th style={{ width: '20%', textAlign: 'center' }} nowrap='true'>Avatar</th>
                            <th style={{ width: 'auto' }}>Active</th>
                            <th style={{ width: 'auto', textAlign: 'center' }} nowrap='true'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.category.map((item, index) => (
                            <tr key={index}>
                                <td>
                                    <a href='#' onClick={e => this.edit(e, item)}>{item.title}</a>
                                </td>
                                <td style={{ width: '20%', textAlign: 'center' }}>
                                    <img src={item.image ? item.image : '/img/avatar.jpg'} alt='avatar' style={{ height: '32px' }} />
                                </td>
                                <td className='toggle' style={{ textAlign: 'center' }} >
                                    <label>
                                        <input type='checkbox' checked={item.active} onChange={() => this.changeActive(item, index)} /><span className='button-indecator' />
                                    </label>
                                </td>
                                <td className='btn-group'>
                                    <a className='btn btn-success' href='#' onClick={e => this.swap(e, item, true)}>
                                        <i className='fa fa-lg fa-arrow-up' />
                                    </a>
                                    <a className='btn btn-success' href='#' onClick={e => this.swap(e, item, false)}>
                                        <i className='fa fa-lg fa-arrow-down' />
                                    </a>
                                    <a className='btn btn-primary' href='#' onClick={e => this.edit(e, item)}>
                                        <i className='fa fa-lg fa-edit' />
                                    </a>
                                    <a className='btn btn-danger' href='#' onClick={e => this.delete(e, item)}>
                                        <i className='fa fa-lg fa-trash' />
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            );
        } else {
            table = <p>No category!</p>;
        }

        return (
            <div>
                <div className='row tile'>
                    {table}
                </div>
                <button type='button' className='btn btn-primary btn-circle' style={{ position: 'fixed', right: '10px', bottom: '10px' }}
                    onClick={this.create}>
                    <i className='fa fa-lg fa-plus' />
                </button>
                <CategoryModal ref={this.modal} createCategory={this.props.createCategory} updateCategory={this.props.updateCategory} uploadType={this.props.uploadType} />
            </div >
        );
    }
}

const mapStateToProps = state => ({ category: state.category })
const mapActionsToProps = { getAll, createCategory, swapCategory, updateCategory, deleteCategory };
export default connect(mapStateToProps, mapActionsToProps)(Category);