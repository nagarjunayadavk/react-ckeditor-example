import React, { Component } from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

console.log(ClassicEditor.builtinPlugins.map( plugin => plugin.pluginName ));

class CkEditorPage extends Component {
    constructor(props) {
        super(props);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    state = {
        title: '',
        body: ''
    }

    onChangeTitle(e) {
        this.setState({
            title: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        console.log(this.state.title, this.state.body);
		//create a post
        fetch("http://localhost:3001/api/v1/posts", {
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title: this.state.title, body: this.state.body })
        }).then(res => res.json())
            .then(res => console.log(res));
    }
    render() {
        return (
            <div className="App">
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Title :  </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.title}
                            onChange={this.onChangeTitle}
                        />
                    </div>
                    <label>Content :  </label>
                    <textarea className='text-editor' value={this.state.body} hidden></textarea>
                    <CKEditor
                        editor={ClassicEditor}
                        data="<p>Hey, Nag </p>"
                        config={{ckfinder: {
                            uploadUrl: 'https://ckeditor.com/apps/ckfinder/3.5.0/core/connector/php/connector.php?command=QuickUpload&type=Files&responseType=json'
                        }}}
                        onInit={editor => {
                            // You can store the "editor" and use when it is needed.
                            console.log('Editor is ready to use!', editor);
                        }}
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            this.setState({ body: data });
                            console.log({ event, editor, data });
                        }}
                        onBlur={(event, editor) => {
                            console.log('Blur.', editor);
                        }}
                        onFocus={(event, editor) => {
                            console.log('Focus.', editor);
                        }}

                    />
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}

export default CkEditorPage;