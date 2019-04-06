import React from 'react';

const UploadBoxStyle = {
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    width: 'auto',
    height: '124px',
    lineHeight: '124px',
    fontSize: '64px',
    color: 'black',
    textAlign: 'center',
    border: '1px dashed #333',
    cursor: 'pointer'
};

exports.AudioFile = 'audio/*';
exports.VideoFile = 'video/*';
exports.ImageFile = 'image/*';

export default class FileBox extends React.Component {
    constructor(props) {
        super(props);
        this.setData = this.setData.bind(this);
        this.onDrop = this.onDrop.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onDragOver = this.onDragOver.bind(this);
        this.onDragEnter = this.onDragEnter.bind(this);
        this.onDragLeave = this.onDragLeave.bind(this);
        this.onSelectFileChanged = this.onSelectFileChanged.bind(this);
        this.onUploadFile = this.onUploadFile.bind(this);

        this.box = React.createRef();
        this.uploadInput = React.createRef();

        this.state = { isUploading: false, userData: null };
    }

    setData(userData) {
        this.setState({ userData })
    }

    onDrop(event) {
        event.preventDefault();
        $(this.box.current).css('background-color', '#FFF')

        if (event.dataTransfer.items) {
            if (event.dataTransfer.items.length > 0) {
                const item = event.dataTransfer.items[0];
                if (item.kind == 'file') {
                    this.onUploadFile(event.dataTransfer.items[0].getAsFile());
                }
            }
            event.dataTransfer.items.clear();
        } else {
            if (event.dataTransfer.files.length > 0) {
                this.onUploadFile(event.dataTransfer.files[0]);
            }
            event.dataTransfer.clearData();
        }
    }

    onClick(event) {
        $(this.uploadInput.current).click();
        event.preventDefault();
    }

    onDragOver(event) {
        event.preventDefault();
    }
    onDragEnter(event) {
        $(this.box.current).css({ 'background-color': '#009688' });
        event.preventDefault();
    }
    onDragLeave(event) {
        $(this.box.current).css({ 'background-color': '#FFF' });
        event.preventDefault();
    }

    onSelectFileChanged(event) {
        if (event.target.files.length > 0) {
            this.onUploadFile(event.target.files[0])
        }
    }

    onUploadFile(file) {
        this.setState({ isUploading: true });

        const box = $(this.box.current),
            userData = this.state.userData ? this.state.userData : this.props.userData,
            updateUploadPercent = percent => {
                if (this.props.onPercent) this.props.onPercent(percent);
                box.html(percent + '%');
            };

        const formData = new FormData();
        formData.append(this.props.uploadType, file);
        if (userData) formData.append('userData', userData);

        $.ajax({
            method: 'POST',
            url: this.props.postUrl,
            dataType: 'json',
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            xhr: () => {
                const xhr = new window.XMLHttpRequest();

                xhr.upload.addEventListener('progress', evt => {
                    if (evt.lengthComputable) {
                        updateUploadPercent((100 * evt.loaded / evt.total).toFixed(2));
                    }
                }, false);

                xhr.addEventListener('progress', evt => {
                    if (evt.lengthComputable) {
                        updateUploadPercent((100 * evt.loaded / evt.total).toFixed(2));
                    }
                }, false);

                return xhr;
            },
            complete: () => {
                box.html('');
                this.setState({ isUploading: false });
                if (this.props.complete) this.props.complete();
            },
            success: data => {
                if (this.props.success) this.props.success(data);
            },
            error: error => {
                if (this.props.error) this.props.error(error);
            }
        });
    }

    render() {
        const accept = this.props.accept ? this.props.accept : '';
        const fileAttrs = { type: 'file' };
        if (this.props.accept) fileAttrs.accept = this.props.accept;

        return (
            <div style={this.props.style} className={this.props.className}>
                <div ref={this.box} id={this.props.uploadType} style={UploadBoxStyle}
                    onDrop={this.onDrop} onClick={this.onClick}
                    onDragOver={this.onDragOver} onDragEnter={this.onDragEnter} onDragLeave={this.onDragLeave} />
                <small className='form-text text-primary' style={{ textAlign: 'center' }}>
                    {this.props.description ? this.props.description : 'Nhấp hoặc kéo tập tin thả vào ô phía trên!'}
                </small >
                <input {...fileAttrs} name={this.props.uploadType} onChange={this.onSelectFileChanged} style={{ display: 'none' }} ref={this.uploadInput} />
            </div>
        );
    }
}