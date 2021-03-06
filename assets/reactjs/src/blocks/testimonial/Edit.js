const { __ } = wp.i18n
const { Fragment, Component } = wp.element;
const { PanelBody, TextControl, Toolbar } = wp.components
const { RichText, BlockControls, InspectorControls, AlignmentToolbar } = wp.editor
import { Media, RadioAdvanced, Range, Color, Typography, Separator, ColorAdvanced, Border, BorderRadius, BoxShadow, Styles, Alignment, Padding } from '../../components/FieldRender'
import InlineToolbar from '../../components/fields/inline/InlineToolbar'
import { CssGenerator } from '../../components/CssGenerator'
import icons from '../../helpers/icons';
import '../../components/GlobalSettings'

class Edit extends Component {
    constructor(props) {
        super(props)
        this.state = {
            device: 'md',
            spacer: true,
            openPanelSetting: ''
        }
    }
    componentDidMount() {
        const { setAttributes, clientId, attributes: { uniqueId } } = this.props
        const _client = clientId.substr(0, 6)
        if (!uniqueId) {
            setAttributes({ uniqueId: _client });
        } else if (uniqueId && uniqueId != _client) {
            setAttributes({ uniqueId: _client });
        }
    }
    handlePanelOpenings = (panelName) => {
        this.setState({ ...this.state, openPanelSetting: panelName })
    }
    render() {
        const { uniqueId, layout, message, messageSpacingTop, messageSpacingBottom, name, alignment, designation, avatar, avatarAlt, avatarBorderRadius, avatarSize, avatarWidth, avatarHeight, avatarBorder, avatarSpacing, avatarLayout, quoteIconColor, quoteIconSize, quoteIconSpacing, nameTypo, nameSpacing, messageTypo, designationTypo, starsSize, ratingsColor, quoteIcon, ratings, ratingsSpacing, bgPadding, textColor, bgColor, bgBorderRadius, border, boxShadow } = this.props.attributes
        const { setAttributes } = this.props
        const { openPanelSetting, device } = this.state
        if (uniqueId) { CssGenerator(this.props.attributes, 'testimonial', uniqueId); }

        const testimonialTitle = <RichText
            key="editable"
            tagName="span"
            keepPlaceholderOnFocus
            placeholder={__('Add Name...')}
            formattingControls={['bold', 'italic', 'link', 'strikethrough']}
            onChange={value => setAttributes({ name: value })}
            value={name}
        />

        const testimonialDesignation = <RichText
            key="editable"
            tagName="span"
            placeholder={__('Add designation...')}
            formattingControls={['bold', 'italic', 'link', 'strikethrough']}
            keepPlaceholderOnFocus
            onChange={value => setAttributes({ designation: value })}
            value={designation}
        />

        const testimonialContent = <RichText
            key="editable"
            tagName="div"
            placeholder={__('Add Message...')}
            formattingControls={['bold', 'italic', 'link', 'strikethrough']}
            keepPlaceholderOnFocus
            onChange={value => setAttributes({ message: value })}
            value={message}
        />

        const authorInfo = <Fragment>
            <div className={`qubely-testimonial-author`}>
                <div className={`qubely-testimonial-avatar-layout-${avatarLayout}`}>
                    {(avatarLayout == 'left' || avatarLayout == 'top') &&
                        <Fragment>
                            {avatar.url != undefined ?
                                <img className="qubely-testimonial-avatar" src={avatar.url} alt={avatarAlt} onClick={() => this.handlePanelOpenings('Avatar')} />
                                :
                                <div className="qubely-image-placeholder qubely-testimonial-avatar" onClick={() => this.handlePanelOpenings('Avatar')}><i className="far fa-user"></i></div>
                            }
                        </Fragment>
                    }
                    
                    <div className="qubely-testimonial-author-info">
                        <div className="qubely-testimonial-author-name" onClick={() => this.handlePanelOpenings('Name')}>{testimonialTitle}</div>
                        <div className="qubely-testimonial-author-designation" onClick={() => this.handlePanelOpenings('Designation')}>{testimonialDesignation}</div>
                    </div>

                    {(avatarLayout == 'right' || avatarLayout == 'bottom') &&
                        <Fragment>
                            {avatar.url != undefined ?
                                <img className="qubely-testimonial-avatar" src={avatar.url} alt={avatarAlt} onClick={() => this.handlePanelOpenings('Avatar')} />
                                :
                                <div className="qubely-image-placeholder qubely-testimonial-avatar" onClick={() => this.handlePanelOpenings('Avatar')}><i className="far fa-user"></i></div>
                            }
                        </Fragment>
                    }
                </div>
            </div>
        </Fragment>

        return (
            <Fragment>
                <InspectorControls key="inspector">
                    <PanelBody title="" initialOpen={true}>
                        <Styles value={layout} onChange={val => setAttributes({ layout: val })}
                            options={[
                                { value: 1, svg: icons.testimonial_1, label: __('Layout 1') },
                                { value: 2, svg: icons.testimonial_2, label: __('Layout 2') }
                            ]}
                        />
                        <Alignment label={__('Alignment')} value={alignment} alignmentType="content" onChange={val => setAttributes({ alignment: val })} alignmentType="content" disableJustify responsive device={device} onDeviceChange={value => this.setState({ device: value })} />
                    </PanelBody>
                    <PanelBody title={__('Message')} opened={'Message' === openPanelSetting} onToggle={() => this.handlePanelOpenings(openPanelSetting !== 'Message' ? 'Message' : '')}>
                        <Range
                            label={__('Top Spacing')}
                            value={messageSpacingTop} onChange={(value) => setAttributes({ messageSpacingTop: value })}
                            unit={['px', 'em', '%']} max={300}
                            min={0}
                            responsive
                            device={device}
                            onDeviceChange={value => this.setState({ device: value })} />
                        <Range
                            label={__('Bottom Spacing')}
                            value={messageSpacingBottom} onChange={(value) => setAttributes({ messageSpacingBottom: value })}
                            unit={['px', 'em', '%']} max={300}
                            min={0}
                            responsive
                            device={device}
                            onDeviceChange={value => this.setState({ device: value })} />
                        <Typography
                            label={__('Typography')}
                            value={messageTypo}
                            onChange={(value) => setAttributes({ messageTypo: value })}
                            device={device} onDeviceChange={value => this.setState({ device: value })} />
                    </PanelBody>

                    <PanelBody title={__('Name')} opened={'Name' === openPanelSetting} onToggle={() => this.handlePanelOpenings(openPanelSetting !== 'Name' ? 'Name' : '')}>
                        <Range
                            label={__('Spacing')}
                            value={nameSpacing} onChange={(value) => setAttributes({ nameSpacing: value })}
                            unit={['px', 'em', '%']} max={300}
                            min={0}
                            responsive
                            device={device}
                            onDeviceChange={value => this.setState({ device: value })} />
                        <Typography
                            label={__('Typography')}
                            value={nameTypo}
                            onChange={(value) => setAttributes({ nameTypo: value })}
                            device={device} onDeviceChange={value => this.setState({ device: value })} />
                    </PanelBody>

                    <PanelBody title={__('Designation')} className={'Designation' === openPanelSetting ? 'activePanel' : ''} opened={'Designation' === openPanelSetting} onToggle={() => this.handlePanelOpenings(openPanelSetting !== 'Designation' ? 'Designation' : '')}>
                        <Typography
                            label={__('Typography')}
                            value={designationTypo}
                            onChange={(value) => setAttributes({ designationTypo: value })}
                            device={device} onDeviceChange={value => this.setState({ device: value })} />
                    </PanelBody>

                    <PanelBody title={__('Avatar')} opened={'Avatar' === openPanelSetting} onToggle={() => this.handlePanelOpenings(openPanelSetting !== 'Avatar' ? 'Avatar' : '')}>
                        <Media
                            label={__('Upload Avatar')} multiple={false} type={['image']}
                            value={avatar} panel={true} onChange={value => setAttributes({ avatar: value })} />
                        {avatar.url &&
                            <TextControl
                                label={__('Alt Text (Alternative Text)')}
                                value={avatarAlt} onChange={value => setAttributes({ avatarAlt: value })} />
                        }
                        <Styles label={__('Avatar Layout')} value={avatarLayout} onChange={val => setAttributes({ avatarLayout: val })}
                            options={[
                                { value: 'left', svg: icons.avatar_left, label: __('Left') },
                                { value: 'right', svg: icons.avatar_right, label: __('Right') },
                                { value: 'top', svg: icons.avatar_top, label: __('Top') },
                                { value: 'bottom', svg: icons.avatar_bottom, label: __('Bottom') },
                            ]}
                        />
                        <Separator />
                        <RadioAdvanced
                            label={__('Avatar Size')}
                            options={[
                                { label: 'S', value: '48px', title: 'Small' },
                                { label: 'M', value: '64px', title: 'Medium' },
                                { label: 'L', value: '96px', title: 'Large' },
                                { icon: 'fas fa-cog', value: 'custom', title: 'Custom' }
                            ]}
                            value={avatarSize}
                            onChange={(value) => setAttributes({ avatarSize: value })}
                        />
                        {avatarSize == 'custom' &&
                            <Fragment>
                                <Range
                                    label={<span className="dashicons dashicons-leftright" title="Width" />}
                                    value={avatarWidth}
                                    onChange={(value) => setAttributes({ avatarWidth: value })}
                                    unit={['px', 'em', '%']}
                                    max={300}
                                    min={0}
                                    responsive
                                    device={device}
                                    onDeviceChange={value => this.setState({ device: value })}
                                />
                                <Range
                                    label={<span className="dashicons dashicons-sort" title="Height" />}
                                    value={avatarHeight}
                                    onChange={(value) => setAttributes({ avatarHeight: value })}
                                    unit={['px', 'em', '%']}
                                    max={300}
                                    min={0}
                                    responsive
                                    device={device}
                                    onDeviceChange={value => this.setState({ device: value })}
                                />
                            </Fragment>
                        }
                        <Fragment>
                            <BorderRadius
                                label={__('Radius')}
                                value={avatarBorderRadius} onChange={(value) => setAttributes({ avatarBorderRadius: value })}
                                min={0}
                                max={100}
                                unit={['px', 'em', '%']}
                                responsive
                                device={device}
                                onDeviceChange={value => this.setState({ device: value })} />
                            <Border
                                label={__('Border')}
                                value={avatarBorder}
                                onChange={(value) => setAttributes({ avatarBorder: value })}
                                unit={['px', 'em', '%']}
                                responsive
                                device={device}
                                onDeviceChange={value => this.setState({ device: value })}
                            />
                            <Range
                                label={__('Spacing')}
                                value={avatarSpacing}
                                onChange={(value) => setAttributes({ avatarSpacing: value })}
                                min={0}
                                max={200}
                                unit={['px', 'em', '%']}
                                responsive
                                device={device}
                                onDeviceChange={value => this.setState({ device: value })} />
                        </Fragment>
                    </PanelBody>

                    <PanelBody title={__('Quote Icon')} opened={'Quote Icon' === openPanelSetting} onToggle={() => this.handlePanelOpenings(openPanelSetting !== 'Quote Icon' ? 'Quote Icon' : '')}>
                        <RadioAdvanced
                            label={__('Icon')}
                            options={[
                                { icon: 'fas fa-ban', value: '' },
                                { icon: 'fas fa-quote-left', value: 'fas fa-quote-left' },
                                { icon: 'dashicons dashicons-format-quote', value: 'dashicons dashicons-format-quote' },
                                { icon: 'dashicons dashicons-editor-quote', value: 'dashicons dashicons-editor-quote' }
                            ]}
                            value={quoteIcon}
                            onChange={val => setAttributes({ quoteIcon: val })} />
                        {quoteIcon &&
                            <Fragment>
                                <Color
                                    label={__('Color')}
                                    value={quoteIconColor} onChange={(value) => setAttributes({ quoteIconColor: value })} />
                                <Range
                                    label={__('Size')}
                                    value={quoteIconSize} onChange={(value) => setAttributes({ quoteIconSize: value })}
                                    min={10}
                                    max={150}
                                    unit={['px', 'em', '%']}
                                    responsive
                                    device={device}
                                    onDeviceChange={value => this.setState({ device: value })}
                                />
                                <Range
                                    label={__('Spacing')}
                                    value={quoteIconSpacing} onChange={(value) => setAttributes({ quoteIconSpacing: value })}
                                    min={0}
                                    max={100}
                                    unit={['px', 'em', '%']}
                                    responsive
                                    device={device}
                                    onDeviceChange={value => this.setState({ device: value })} />
                            </Fragment>
                        }
                    </PanelBody>

                    <PanelBody title={__('Ratings')} opened={'Ratings' === openPanelSetting} onToggle={() => this.handlePanelOpenings(openPanelSetting !== 'Ratings' ? 'Ratings' : '')}>
                        <Range
                            label={__('Ratings')}
                            value={ratings} onChange={(value) => setAttributes({ ratings: value })}
                            min={0}
                            max={5} step={.5} />
                        {(ratings != 0) &&
                            <Fragment>
                                <Color
                                    label={__('Color')}
                                    value={ratingsColor}
                                    onChange={(value) => setAttributes({ ratingsColor: value })} />
                                <Range
                                    label={__('Stars Size')}
                                    value={starsSize} onChange={(value) => setAttributes({ starsSize: value })}
                                    unit={['px', 'em', '%']}
                                    min={10}
                                    max={48}
                                    responsive
                                    device={device}
                                    onDeviceChange={value => this.setState({ device: value })} />
                                <Range
                                    label={__('Spacing')}
                                    value={ratingsSpacing} onChange={(value) => setAttributes({ ratingsSpacing: value })}
                                    unit={['px', 'em', '%']}
                                    min={0}
                                    max={200}
                                    responsive
                                    device={device}
                                    onDeviceChange={value => this.setState({ device: value })} />
                            </Fragment>
                        }
                    </PanelBody>

                    <PanelBody title={__('Design')} initialOpen={false}>
                        <Color
                            label={__('Text Color')}
                            value={textColor}
                            onChange={val => setAttributes({ textColor: val })} />
                        <ColorAdvanced
                            label={__('Background')}
                            value={bgColor} onChange={val => setAttributes({ bgColor: val })} />
                        <Separator />
                        <Border
                            label={__('Border')}
                            value={border} onChange={val => setAttributes({ border: val })} />
                        <BoxShadow
                            label={__('Box Shadow')}
                            value={boxShadow} onChange={val => setAttributes({ boxShadow: val })} />
                        <Separator />
                        <Padding
                            label={__('Padding')}
                            value={bgPadding} onChange={(value) => setAttributes({ bgPadding: value })}
                            unit={['px', 'em', '%']}
                            min={0}
                            max={100}
                            responsive
                            device={device}
                            onDeviceChange={value => this.setState({ device: value })} />

                        <BorderRadius
                            label={__('Border Radius')}
                            value={bgBorderRadius}
                            onChange={val => setAttributes({ bgBorderRadius: val })}
                            min={0}
                            max={100} 
                            unit={['px', 'em', '%']}
                            responsive
                            device={device}
                            onDeviceChange={value => this.setState({ device: value })} />
                        
                    </PanelBody>

                </InspectorControls>

                <BlockControls>
                    <Toolbar>
                        <InlineToolbar
                            data={[{ name: 'InlineSpacer', key: 'spacer', responsive: true }]}
                            {...this.props}
                            prevState={this.state}
                        />
                    </Toolbar>
                    <AlignmentToolbar
                        controls={['left', 'center', 'right']}
                        value={alignment}
                        onChange={(value) => { setAttributes({ alignment: value }) }}
                    />
                </BlockControls>

                <div className={`qubely-block-${uniqueId}`}>
                    <div className={`qubely-block-testimonial`}>

                        { layout == 2 && authorInfo }

                        {ratings > 0 && (layout == 2) &&
                            <div className="qubely-testimonial-ratings" data-qubelyrating={ratings} onClick={() => this.handlePanelOpenings('Ratings')}></div>
                        }
                        
                        { (quoteIcon && (layout == 1)) &&
                            <div className="qubely-testimonial-quote" onClick={() => this.handlePanelOpenings('Quote Icon')}><span className={`qubely-quote-icon ${quoteIcon}`}></span></div>
                        }

                        <div className="qubely-testimonial-content" onClick={() => this.handlePanelOpenings('Message')} >
                            {testimonialContent}
                        </div>

                        {ratings > 0 && (layout == 1) &&
                            <div className="qubely-testimonial-ratings" data-qubelyrating={ratings} onClick={() => this.handlePanelOpenings('Ratings')}></div>
                        }

                        { layout == 1 && authorInfo }

                        { (quoteIcon && (layout == 2)) &&
                            <div className="qubely-testimonial-quote qubely-position-bottom" onClick={() => this.handlePanelOpenings('Quote Icon')}><span className={`qubely-quote-icon ${quoteIcon}`}></span></div>
                        }
                        
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default Edit