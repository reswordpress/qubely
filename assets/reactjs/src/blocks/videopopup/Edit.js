const { __ } = wp.i18n
const { Fragment, Component } = wp.element;
const { PanelBody, RangeControl, TextControl, Toolbar } = wp.components
const { InspectorControls, BlockControls } = wp.editor
import { Media, Background, Tabs, Tab, Range, BoxShadow, Separator, RadioAdvanced, Typography, Select, Color, Styles, Toggle, Border, Alignment, BorderRadius } from "../../components/FieldRender"
import InlineToolbar from '../../components/fields/inline/InlineToolbar'
import { CssGenerator } from '../../components/CssGenerator'
import icons from '../../helpers/icons';
import '../../components/GlobalSettings';

class Edit extends Component {
    
    constructor(props) {
		super(props)
		this.state = { spacer: true }
    }
    
    componentDidMount(){
        const { setAttributes, clientId, attributes:{ uniqueId } } = this.props
        const _client = clientId.substr(0,6)
		if ( !uniqueId ) {
			setAttributes({uniqueId: _client});
		} else if ( uniqueId && uniqueId != _client ) {
			setAttributes({uniqueId:_client});
        }
        
        this.$el = $(this.el);
        this.$el.magnificPopup({
            type: 'iframe',
            rtl: true,
            mainClass: 'mfp-fade',
            removalDelay: 300,
            preloader: false,
            fixedContentPos: false
        });
    }
    
    render() {
        const { uniqueId, videoSource, bgVideo, url, icon, height, iconColor, iconHoverColor, iconSize, iconSizeCustom, background, enableBackgroundOverlay, borderRadius, layout, shadow, shadowHover, postfix, prefix, typography, textGap, overlayBackground, overlayBlend, overlayOpacity, overlayHoverOpacity, iconBorderRadius, iconBgColor, isRipple, iconHoverBgColor, border, prePostColor, prePostHoverColor, borderColorHover, alignment } = this.props.attributes
        const { setAttributes } = this.props
        
        if( uniqueId ){ CssGenerator( this.props.attributes, 'videopopup', uniqueId ); }

        return (
            <Fragment>
                <InspectorControls  key="inspector">
                    <PanelBody title=''>
						<Styles value={layout} onChange={ val => setAttributes({ layout: val })}
							options={[
								{ value: 'fill', svg: icons.videopopup_fill, label:__('Fill') },
								{ value: 'nofill', svg: icons.videopopup_classic, label:__('Claasic') },
							]}
						/>
                        <Alignment label={__('Alignment')} value={alignment} alignmentType="content" onChange={ val => setAttributes({ alignment: val })} disableJustify />
                    </PanelBody>

                    <PanelBody title={__('Video')} initialOpen={false}>
                        <Select label={ __('Source') } value={videoSource} options={ [ ['local', __('Self Hosted ( Local )')], ['external', __('External')]] } onChange={ val => setAttributes( {videoSource: val} ) } />
                        { videoSource == 'external' ?
                            <TextControl type="url" label={ __( 'URL' ) } value={ url } onChange={ val => {
                                if( val.indexOf('youtu.be') ){
                                    val = val.replace( "youtu.be/", "www.youtube.com/watch?v=" );
                                }
                                setAttributes({ url: val })
                            }}/>
                            :
                            <Media label={__('Path')} multiple={false} type={['video']} panel={true} value={bgVideo} onChange={ val => setAttributes( {bgVideo: val} ) } />
                        }
                    </PanelBody>

                    <PanelBody title={ __( 'Icon' ) } initialOpen={false}>
                        <RadioAdvanced
                            label= {__('Icon')}
                            options={ [
                                { icon: 'fas fa-play', value: 'fas fa-play', title: __('Play') },
                                { icon: 'fas fa-video', value: 'fas fa-video', title: __('Video') },
                                { icon: 'fab fa-youtube', value: 'fab fa-youtube', title: __('YouTube') },
                                { icon: 'fab fa-vimeo-v', value: 'fab fa-vimeo-v', title: __('Vimeo') },
                                { icon: 'fas fa-search-plus', value: 'fas fa-search-plus', title: __('Search') }
                            ] }
                            value={ icon }
                            onChange={ val => setAttributes( { icon: val } ) }
                        />

                        <BorderRadius label={__('Radius')} value={iconBorderRadius} onChange={val => setAttributes({ iconBorderRadius: val })} min={0} max={100} unit={['px', 'em', '%']} responsive />

                        <RadioAdvanced
                            label={__('Icon Size')}
                            options={ [
                                { label: 'S', value: 'small', title: 'Small' },
                                { label: 'M', value: 'medium', title: 'Medium' },
                                { label: 'L', value: 'large', title: 'Large' },
                                { icon: 'fas fa-cog', value: 'custom', title: 'Custom' },
                            ] }
                            value={ iconSize }
                            onChange={ val => setAttributes( { iconSize: val } ) }
                        />
                        { iconSize == 'custom' &&
                            <Fragment>
                                <Range value={iconSizeCustom} onChange={ val => setAttributes({ iconSizeCustom: val })} min={20} max={200} responsive unit />
                            </Fragment>
                        }

                        <Tabs>
                            <Tab tabTitle={__('Normal')}>
                                <Color label={__('Icon Color')}  value={iconColor} onChange={val => setAttributes({ iconColor: val })} />
                                <Color label={__('Background Color')} value={iconBgColor||''} onChange={val => setAttributes({ iconBgColor: val })} />
                                <Border label={__('Border')} value={border} onChange={ val => setAttributes({ border: val })} min={0} max={20} responsive unit />
                            </Tab>
                            <Tab tabTitle={__('Hover')}>
                                <Color label={__('Icon Color')} value={iconHoverColor} onChange={val => setAttributes({ iconHoverColor: val })} />
                                <Color label={__('Background Color')} value={iconHoverBgColor || ''} onChange={val => setAttributes({ iconHoverBgColor: val })} />
                                <Color label={__('Color')} value={borderColorHover} onChange={val => setAttributes({ borderColorHover: val })} />
                            </Tab>
                        </Tabs>
                        
                        { iconBgColor &&
                            <Toggle label={__('Ripple Effect')} value={isRipple} onChange={val=>setAttributes({isRipple:val})} />
                        }
                    </PanelBody>

                    <PanelBody title={ __( 'Prefix & Postfix' ) } initialOpen={false}>
                        <TextControl label={__( 'Prefix' )} value={ prefix } onChange={ val => setAttributes( { prefix: val } ) } />
                        <TextControl label={__( 'Postfix' )} value={ postfix } onChange={ val => setAttributes( { postfix: val } ) } />
                        { (prefix || postfix) && 
                            <Fragment>
                                <Range label={__('Spacing')} value={textGap} onChange={ val => setAttributes({ textGap: val })} min={0} max={150} unit={['px', 'em', '%']} responsive />
                                <Typography label={__('Typography')} color value={ typography }  onChange={ val => setAttributes( { typography: val } ) } />
                                <Tabs>
                                    <Tab tabTitle={__('Normal')}>
                                        <Color label={__('Color')}  value={prePostColor} onChange={val => setAttributes({ prePostColor: val })} />
                                    </Tab>
                                    <Tab tabTitle={__('Hover')}>
                                        <Color label={__('Color')} value={prePostHoverColor} onChange={val => setAttributes({ prePostHoverColor: val })} />
                                    </Tab>
                                </Tabs>
                            </Fragment>
                        }
                    </PanelBody>

                    {layout == 'fill' &&
                        <Fragment>
                            <PanelBody title={ __( 'Background' ) } initialOpen={false}>
                                <Range label={__('Height')} value={height} onChange={ val => setAttributes({ height: val })} min={100} max={1200} responsive unit />
                                <Background label={__('Background')} sources={['image', 'gradient']} value={background} onChange={ val => setAttributes({background:val}) } />
                                <Tabs>
                                    <Tab tabTitle={__('Normal')}>
                                        <BoxShadow label={ __( 'Box-Shadow' ) } value={shadow} onChange={ val => setAttributes({ shadow: val })} />
                                    </Tab>
                                    <Tab tabTitle={__('Hover')}>
                                        <BoxShadow label={ __( 'Box-Shadow' ) } value={shadowHover} onChange={ val => setAttributes({ shadowHover: val })} />
                                    </Tab>
                                </Tabs>
                                {background.openBg == 1 &&
                                    <Fragment>
                                        <BorderRadius label={__('Radius')} value={borderRadius} onChange={(value) => setAttributes({ borderRadius: value })} min={0} max={100} unit={['px', 'em', '%']} responsive />
                                        <Separator />
                                        <Toggle label={__('Enable Overlay')} value={enableBackgroundOverlay} onChange={val => setAttributes({ enableBackgroundOverlay: val })} />
                                        {enableBackgroundOverlay == 1 &&
                                            <Fragment>
                                                <Background label={__('Overlay')} sources={['image', 'gradient']} value={overlayBackground} onChange={ val => setAttributes({overlayBackground:val}) } />
                                                {overlayBackground.openBg == 1 &&
                                                    <Fragment>
                                                        <RangeControl beforeIcon={"lightbulb"} label={__('Opacity')} min={0.01} max={1} step={.01} value={overlayOpacity} onChange={val=>setAttributes({overlayOpacity:val})} />
                                                        <RangeControl beforeIcon={"lightbulb"} label={__('Hover Opacity')} min={0.01} max={1} step={.01} value={overlayHoverOpacity} onChange={val=>setAttributes({overlayHoverOpacity:val})} />
                                                        <Select label={__('Overlay Blend Mode')} options={[ ['normal', __('Normal')], ['multiply', __('Multiply')], ['screen', __('Screen')], ['overlay', __('Overlay')], ['darken', __('Darken')], ['lighten', __('Lighten')], ['color-dodge', __('Color Dodge')], ['saturation', __('Saturation')], ['luminosity', __('Luminosity')], ['color', __('Color')], ['color-burn', __('Color Burn')], ['exclusion', __('Exclusion')], ['hue', __('Hue')] ]} value={overlayBlend} onChange={val => setAttributes({ overlayBlend: val })} />
                                                    </Fragment>
                                                }
                                            </Fragment>
                                        }
                                    </Fragment>
                                }
                            </PanelBody>
                        </Fragment>
                    }

                </InspectorControls>

                <BlockControls>
                    <Toolbar>
                        <InlineToolbar 
                            data={[ { name: 'InlineSpacer', key: 'spacer', responsive: true } ]}
                            {...this.props}
                            prevState={this.state}
                            />
                    </Toolbar>
				</BlockControls>
            
                <div className={`qubely-block-${uniqueId}`}>
                    <div className={`qubely-block-videopopup-wrapper qubely-alignment-${alignment}`}>
                        {layout == 'fill' && <div className="qubely-block-videopopup-overlay"></div>}
						<div className={`qubely-block-videopopup qubely-size-${iconSize}`} >
                            <a className="qubely-video-popup" ref={el => this.el = el} href={videoSource=='external'?url:(bgVideo.url||'')}>
                                { prefix &&  <span className="qubely-video-popup-prefix"> {prefix} </span> }
                                { icon &&
                                    <span className="qubely-btn-icon-wrapper">
                                        <i className={`qubely-btn-icon ${icon}`}>
                                            { ( iconBgColor && isRipple) && <span
                                                className="qubely-ripple"
                                                style={{
                                                    '--qubely-ripple-radius' : iconBorderRadius
                                                }}
                                            ></span> }
                                        </i>
                                    </span>
                                }
                                { postfix &&  <span className="qubely-video-popup-postfix">{postfix}</span> }
                            </a>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}
export default Edit