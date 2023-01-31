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
import { addBlog, editBlog, removeBlog, uploadBlogImage } from 'redux/action/Blog';
import { useLocation, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { base_url_new } from 'utils/config';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState, convertToRaw, ContentState, convertFromHTML } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

const getInitialState = (defaultValue) => {
    if (defaultValue) {
        const blocksFromHtml = htmlToDraft(defaultValue);
        const { contentBlocks, entityMap } = blocksFromHtml;
        const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
        return EditorState.createWithContent(contentState);
    } else {
        return EditorState.createEmpty();
    }
};
const BlogDetail = () => {
    const { state } = useLocation();
    console.log('BlogDetails', state);
    const [url2, seturl2] = React.useState(base_url_new + state.url);
    const [name, setname] = React.useState(state.name);
    const [imageFile, setimageFile] = React.useState('');
    const [description, setdescription] = React.useState(state.description);
    const [content, setcontent] = React.useState(state.content);
    const [editorState, seteditorState] = React.useState(getInitialState(state?.content));

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { blog_image } = useSelector((state) => state._blog);
    const imageUpload = (e, type) => {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = (e) => {
            seturl2(e.target.result);
            setimageFile(file);
            const formData = new FormData();
            formData.append('blogImage', file);
            dispatch(uploadBlogImage(formData));
        };
        reader.readAsDataURL(file);
    };

    const onEditorStateChange = (editorState) => {
        console.log('editorState', editorState);
        seteditorState(editorState);
        console.log('content', draftToHtml(convertToRaw(editorState.getCurrentContent())));
        setcontent(draftToHtml(convertToRaw(editorState.getCurrentContent())));
    };

    const updateYourBlog = () => {
        const fields = {
            name,
            description,
            content,
            id: state._id
        };
        const imageObj = {
            ...fields,
            url: blog_image?.url,
            image: blog_image?.image
        };

        const updatedData = blog_image ? imageObj : fields;
        console.log('updatedData', updatedData);

        dispatch(editBlog(updatedData, navigate));
    };

    return (
        <>
            <div className="add-thread addBlog">
                <h2>Edit Blog</h2>
                <div className="row">
                    <div className="col-lg-5 col-md-6">
                        <div className="upload-heading">
                            <p className="label">Image Upload</p>
                        </div>
                        <div className="d-flex flex-row flex-wrap">
                            <div className="d-flex flex-row flex-wrap">
                                {url2 ? (
                                    <img
                                        src={url2}
                                        alt=""
                                        style={{
                                            height: 150,
                                            width: 150,
                                            objectFit: 'cover',
                                            borderRadius: '10px',
                                            marginRight: '10px',
                                            marginTop: '10px'
                                        }}
                                    />
                                ) : null}
                            </div>
                            <div className="upload-btn">
                                <label htmlFor="contained-button-file" for="file-input" aria-controls="">
                                    <div className="plus-icon">
                                        <AddIcon />
                                    </div>

                                    <input
                                        type="file"
                                        id="file-input"
                                        name="image"
                                        accept="image/x-png,image/gif,image/jpeg"
                                        onChange={(e) => imageUpload(e)}
                                    />
                                </label>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-12">
                                <Typography className="label mt-4" variant="p" component="p">
                                    Name
                                </Typography>
                                <TextField
                                    className="w-100 input"
                                    placeholder="Write name..."
                                    value={name}
                                    onChange={(e) => setname(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <Typography className="label mt-4" variant="p" component="p">
                                    Description
                                </Typography>
                                <TextareaAutosize
                                    className="w-100"
                                    aria-label="minimum height"
                                    minRows={7}
                                    placeholder="Write description..."
                                    onChange={(e) => setdescription(e.target.value)}
                                    value={description}
                                />
                            </div>
                        </div>
                        {/* <div className="row">
                            <div className="col-md-12">
                                <Typography className="label mt-4" variant="p" component="p">
                                    Start Time
                                </Typography>
                                <FormControl className="w-100">
                                    <Select className="w-100 select">
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value={10}>Ten</MenuItem>
                                        <MenuItem value={20}>Twenty</MenuItem>
                                        <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <Typography className="label mt-4" variant="p" component="p">
                                    End Time
                                </Typography>
                                <FormControl className="w-100">
                                    <Select className="w-100 select">
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value={10}>Ten</MenuItem>
                                        <MenuItem value={20}>Twenty</MenuItem>
                                        <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>
                                </FormControl>
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
                            {/* <CKEditor
                                editor={ClassicEditor}
                                data={content}
                                onChange={(event, editor) => {
                                    const data = editor.getData();
                                    console.log({ event, editor, data });
                                    setcontent(data);
                                }}
                            /> */}
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
                                }}
                            />
                        </div>
                    </div>
                </div>

                <div className="d-flex justify-content-center my-5">
                    <div className="btn btn-primary brownBtn px-5 mx-2" onClick={() => navigate(-1)}>
                        Cancel
                    </div>
                    <div className="btn btn-primary brownBtn px-5" onClick={updateYourBlog}>
                        Update Blog
                    </div>

                    {/* <div className="btn btn-primary brownBtn" onClick={() => dispatch(removeBlog({ id: state._id }, navigate))}>
                        Remove Blog
                    </div> */}
                </div>
            </div>
        </>
    );
};

export default BlogDetail;
