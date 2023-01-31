import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { addBlog } from 'redux/action/Blog';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TimePicker from '@mui/lab/TimePicker';
import makeToast from 'utils/Toaster';
//
// import ReactSummernote from 'react-summernote';
// import 'react-summernote/dist/react-summernote.css'; // import styles
// import 'react-summernote/lang/summernote-ru-RU';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';

const editorConfiguration = {
    fontSize: {
        optoins: [9, 11]
    }
};
const AddBlog = () => {
    const [url2, seturl2] = React.useState('');
    const [name, setname] = React.useState('');
    const [imageFile, setimageFile] = React.useState('');
    const [description, setdescription] = React.useState('');
    const [content, setcontent] = React.useState('');
    const [editorState, seteditorState] = React.useState(EditorState.createEmpty());
    const [uploadedImages, setUploadedImages] = React.useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { role } = useSelector((state) => state._auth);

    const imageUpload = (e, type) => {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = (e) => {
            if (type === 1) {
                seturl(e.target.result);
                setValues({ ...values, profile: file });
            } else {
                seturl2(e.target.result);
                setimageFile(file);
            }
        };
        reader.readAsDataURL(file);
    };

    const addNewBlog = () => {
        console.log(name, imageFile, description, content);
        if (name && imageFile && description && content) {
            const formdata = new FormData();
            formdata.append('name', name);
            formdata.append('blogImage', imageFile);
            formdata.append('description', description);
            formdata.append('content', content);
            if (role === 'admin') {
                formdata.append('isApproved', 'approved');
            }
            dispatch(addBlog(formdata, navigate));
        } else {
            makeToast('error', 'Kindly fill all the inputs');
        }
    };

    const [value, setValue] = React.useState(new Date('2018-01-01T00:00:00.000Z'));

    const onEditorStateChange = (editorState) => {
        console.log('editorState', editorState.getCurrentContent());
        seteditorState(editorState);
        setcontent(draftToHtml(convertToRaw(editorState.getCurrentContent())));
        console.log('content', draftToHtml(convertToRaw(editorState.getCurrentContent())));
    };

    const uploadImageCallBack = (file) => {
        let uploadedImage = uploadedImages;
        const imageObject = {
            file: file,
            localSrc: URL.createObjectURL(file)
        };
        uploadedImage.push(imageObject);
        setUploadedImages(uploadedImage);
        return new Promise((resolve, reject) => {
            resolve({ data: { link: imageObject.localSrc } });
        });
    };
    return (
        <>
            <div className="add-thread addBlog">
                <h2>Add / Edit Blog</h2>
                <div className="row">
                    <div className="col-lg-5 col-md-6">
                        <div className="upload-heading">
                            <p className="label">Image Upload</p>
                        </div>
                        <div className="upload-btn">
                            <label htmlFor="contained-button-file" for="file-input" aria-controls="">
                                <div className="plus-icon">
                                    <AddIcon />
                                </div>
                                {url2 ? (
                                    <img src={url2} alt="" style={{ height: 148, width: 148, objectFit: 'cover', borderRadius: '7px' }} />
                                ) : (
                                    <input
                                        type="file"
                                        id="file-input"
                                        name="image"
                                        accept="image/x-png,image/gif,image/jpeg"
                                        onChange={(e) => imageUpload(e, 2)}
                                    />
                                )}
                            </label>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <Typography className="label mt-4" variant="p" component="p">
                                    Name
                                </Typography>
                                <TextField className="w-100 input" placeholder="Write name..." onChange={(e) => setname(e.target.value)} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <Typography className="label mt-4" variant="p" component="p">
                                    Description
                                </Typography>
                                <TextareaAutosize
                                    className="w-100 form-control"
                                    aria-label="minimum height"
                                    minRows={4}
                                    placeholder="Write description..."
                                    onChange={(e) => setdescription(e.target.value)}
                                />
                            </div>
                        </div>
                        {/* <div className="row time">
                            <div className="col-md-12">
                                <Typography className="label mt-4" variant="p" component="p">
                                    Start Time
                                </Typography>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <TimePicker
                                    value={value}
                                    onChange={setValue}
                                    renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>
                            </div>
                        </div>
                        <div className="row time">
                            <div className="col-md-12">
                                <Typography className="label mt-4" variant="p" component="p">
                                    End Time
                                </Typography>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <TimePicker
                                    value={value}
                                    onChange={setValue}
                                    renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>
                            </div>
                        </div> */}
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <Typography className="label mt-4" variant="p" component="p">
                            Blog Content
                        </Typography>
                        <div className="ckEditor">
                            <Editor
                                editorState={editorState}
                                wrapperClassName="demo-wrapper"
                                editorClassName="demo-editor"
                                onEditorStateChange={onEditorStateChange}
                                toolbar={{
                                    options: [
                                        'inline',
                                        'blockType',
                                        'fontSize',
                                        'list',
                                        'textAlign',
                                        'colorPicker',
                                        'link',
                                        'embedded',
                                        'emoji',
                                        'remove',
                                        'history'
                                    ],
                                    inline: { inDropdown: true },
                                    list: { inDropdown: true },
                                    textAlign: { inDropdown: true },
                                    link: { inDropdown: true },
                                    history: { inDropdown: true }
                                    // image: {
                                    //     urlEnabled: true,
                                    //     uploadEnabled: true,
                                    //     uploadCallback: uploadImageCallBack,
                                    //     alignmentEnabled: true,
                                    //     defaultSize: {
                                    //         height: 'auto',
                                    //         width: 'auto',
                                    //     }
                                    // }
                                }}
                            />
                            {/* <div className="row">
                            <div className="col-md-12">
                                <TextareaAutosize
                                    className="w-100 blog-content"
                                    aria-label="minimum height"
                                    style={{'height':'150px'}}
                                    minRows={4}
                                    placeholder="Write description..."
                                    onChange={(e) => setdescription(e.target.value)}
                                />
                            </div>
                        </div> */}
                            {/* <textarea
                                disabled
                                value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
                            ></textarea> */}
                            {/* <ReactSummernote
                                value="Default value"
                                options={{
                                    lang: 'ru-RU',
                                    height: 350,
                                    dialogsInBody: true,
                                    toolbar: [
                                        ['style', ['style']],
                                        ['font', ['bold', 'underline', 'clear']],
                                        ['fontname', ['fontname']],
                                        ['para', ['ul', 'ol', 'paragraph']],
                                        ['table', ['table']],
                                        ['insert', ['link', 'picture', 'video']],
                                        ['view', ['fullscreen', 'codeview']]
                                    ]
                                }}
                                onChange={(content) => console.log('onChange', content)}
                            /> */}
                            {/* <CKEditor
                            // config={ {
                            //     plugins: [ Paragraph, Bold, Italic, Essentials ],
                            //     toolbar: [ 'bold', 'italic' ]
                            // } }
                                editor={ClassicEditor}
                                data=""
                                onChange={(event, editor) => {
                                    const data = editor.getData();
                                    console.log({ event, editor, data });
                                    setcontent(data);
                                }}
                            /> */}
                        </div>
                    </div>
                </div>

                <div className="d-flex justify-content-center my-5">
                    <div className="btn btn-primary brownBtn px-5 mx-2" onClick={() => navigate(-1)}>
                        Cancel
                    </div>

                    <div className="btn btn-primary brownBtn px-5 " onClick={addNewBlog}>
                        Add Blog
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddBlog;
