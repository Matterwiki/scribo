import React from "react";
import styled from "styled-components";

const StyledImgContainer = styled.figure`
    margin: 20px;
`;

const StyledImg = styled.img`
    margin-left: auto;
    margin-right: auto;
    display: block;
    max-width: 100%;
    height: auto;
`;

// const StyledImgCaption = styled.figcaption`
//     margin-top: 10px;
//     font-style: italic;
// `;

// const StyledCaptionTextInput = styled.input`
//     resize: none;
//     display: block;
//     width: 100%;
//     padding: 2px 0;
//     text-align: center;
//     vertical-align: top;
//     border: 0;
//     outline: none;
//     background: none;
// `;

/**
 * Image node component
 *
 * TODO Add caption - The code needed is already in place. We'll have to uncomment those bits and get them to work!
 * TODO Error message if things went awry
 *
 * @export
 * @class ImageNode
 */
export default class ImageNode extends React.Component {
    state = {
        value: "",
        caption: "",
        loading: false
        // error: true
    };

    getEditorProps = () => this.props.editor.props;

    getNodeData = () => this.props.node.data;

    componentDidMount = () => {
        const data = this.getNodeData();

        const { uploadFileHandler } = this.getEditorProps();
        const imgSrc = data.get("url");
        const imgFile = data.get("file");

        if (imgSrc || !(uploadFileHandler instanceof Function)) return;

        this.setState({ loading: true });

        return uploadFileHandler(imgFile).then((imgSrcUrl) => {
            this.setState({
                value: imgSrcUrl,
                loading: false
            });
        });
        // TODO Error handling here
        // .catch()
    };

    handleChange = (e) => {
        this.setState({
            caption: e.target.value
        });
    };

    handleClick = (e) => {
        e.preventDefault();
    };

    render() {
        const imgSrc = this.getNodeData().get("url");
        const { uploadLoadingComponent: UploadLoadingComponent } = this.getEditorProps();

        const { value, loading, caption } = this.state;
        const src = imgSrc || value;

        return (
            <React.Fragment>
                {/* TODO Pass file info to loading component, so it can show contexual messages */}
                {loading && <UploadLoadingComponent />}
                {!loading && (
                    <StyledImgContainer>
                        <StyledImg src={src} />
                        {/* <StyledImgCaption>
                            {caption && <div>{caption}</div>}
                            {!caption && (
                                <StyledCaptionTextInput
                                    placeholder="Add a caption"
                                    onClick={this.handleClick}
                                    onChange={this.handleChange}
                                    value={caption}
                                />
                            )}
                        </StyledImgCaption> */}
                    </StyledImgContainer>
                )}
            </React.Fragment>
        );
    }
}
