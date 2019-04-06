import React from 'react';

export default class Editor extends React.Component {
    constructor(props) {
        super(props);
        this.editor = React.createRef();
        this.ckEditor = null;
        this.state = { ready: false };

        this.html = this.html.bind(this);
    }

    componentDidMount() {
        $(document).ready(() => {
            const filebrowserUploadUrl = this.props.uploadUrl ? this.props.uploadUrl + '?Type=File' : '/admin/upload?Type=File';
            this.ckEditor = CKEDITOR.replace(this.editor.current, { filebrowserUploadUrl });
            this.ckEditor.on('instanceReady', () => {
                if (this.state.ready == false) {
                    if (this.state.value) this.ckEditor.setData(this.state.value);
                    this.setState({ ready: true });
                }
            });
        });
    }

    html(value) {
        if (value || value == '') {
            if (this.state.ready) this.ckEditor.setData(value);
            this.setState({ value });
        } else {
            return this.ckEditor.getData();
        }
    }

    text() {
        return $(this.ckEditor.getData()).text().replace(/\r?\n|\r/gm, ' ').replace(/\s\s+/g, ' ').trim();
    }

    render() {
        return <textarea ref={this.editor} style={{ width: '100%' }} defaultValue={this.props.defaultValue} />;
    }
}