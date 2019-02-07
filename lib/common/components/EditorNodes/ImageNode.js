import React from "react";
import styled from "styled-components";
import isFunction from "lodash.isfunction";

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

const SimpleMdImageNode = ({ alt, src }) => `![${alt}](${src})`;

const SimpleImageNode = ({ alt, src }) => (
    <StyledImgContainer>
        <StyledImg src={src} alt={alt} />
    </StyledImgContainer>
);

/**
 * Image node component
 *
 * TODO This may not be a good way to get this to work, but we could revisit this when we clean things up!
 *
 * @export
 * @class ImageNode
 */
export default class ImageNode extends React.Component {
    state = {
        loading: false,
        error: false
    };

    componentDidMount = () => {
        const { data, key } = this.props.node;

        const {
            imageUploadOptions: { uploadFileHandler }
        } = this.props.editor.props;
        const { src, file } = data.toJSON();

        if (!src && isFunction(uploadFileHandler)) {
            this.setState({ loading: true });

            return uploadFileHandler(file)
                .then((newSrc) => {
                    this.setState({
                        loading: false
                    });

                    // Update node data so we can use this the next time this loads!
                    this.props.editor.setNodeByKey(key, {
                        data: {
                            alt: file.name,
                            src: newSrc
                        }
                    });
                })
                .catch((err) => {
                    console.error(err);
                    this.setState({ error: true });
                });
        }
    };

    handleClick = (e) => {
        e.preventDefault();
    };

    render() {
        const {
            node: { data },
            editor,
            md
        } = this.props;
        const { loading, error } = this.state;
        const { Loading, Error } = editor.props.imageUploadOptions;

        const meta = data.toJSON();

        return (
            <React.Fragment>
                {loading && <Loading {...meta} />}
                {error && <Error {...meta} />}
                {!loading &&
                    !error &&
                    (md ? <SimpleMdImageNode {...meta} /> : <SimpleImageNode {...meta} />)}
            </React.Fragment>
        );
    }
}
