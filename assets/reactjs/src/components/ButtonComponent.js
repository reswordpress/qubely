const { __ } = wp.i18n
const { createHigherOrderComponent } = wp.compose
const { Component, Fragment } = wp.element
const { InspectorControls } = wp.editor
const { PanelBody } = wp.components
import { Typography, Color, ColorAdvanced, Padding, IconList, Select, Styles, Tabs, Tab, Range, Url, BoxShadow, RadioAdvanced, Separator, Border, InnerPanel, Alignment, Toggle, BorderRadius } from './FieldRender'
import icons from '../helpers/icons';
import { CssGenerator } from './CssGenerator'

const addAttribute = (settings) => {
    if (settings.attributes && settings.attributes.buttonComponent) {
        settings.attributes = Object.assign({}, {
            buttonText: { type: 'string', default: '' },
            buttonFillType: { type: 'string', default: 'fill' },
            buttonTag: { type: 'string', default: 'a' },
            buttonUrl: { type: 'object', default: { url: '#' } },
            buttonSize: { type: 'string', default: 'medium' },
            buttonBlock: {
                type: 'boolean',
                default: false,
                style: [
                    {
                        condition: [
                            { key: 'buttonBlock', relation: '==', value: true }
                        ],
                        selector: '{{QUBELY}} .qubely-block-btn-anchor {display: -webkit-box; display: -ms-flexbox; display: flex;}'
                    }
                ]
            },
            buttonPadding: {
                type: 'object',
                default: {
                    openPadding: 1,
                    paddingType: 'global',
                    global: { md: 18 },
                    custom: { md: '10 10 10 10' },
                    unit: 'px'
                },
                style: [
                    {
                        condition: [
                            { key: 'buttonSize', relation: '==', value: 'custom' }
                        ],
                        selector: '{{QUBELY}} .qubely-block-btn-anchor'
                    }
                ]
            },
            buttonTypography: { type: 'object', default: {}, style: [{ selector: '{{QUBELY}} .qubely-block-btn-anchor' }] },
            buttonColor: {
                type: 'string', default: '#fff',
                style: [
                    {
                        condition: [
                            { key: 'buttonFillType', relation: '==', value: 'fill' }
                        ],
                        selector: '{{QUBELY}} .qubely-block-btn-anchor { color:{{buttonColor}}; }'
                    }
                ]
            },
            buttonHoverColor: {
                type: 'string', default: '#fff',
                style: [
                    {
                        selector: '{{QUBELY}} .qubely-block-btn-anchor:hover { color:{{buttonHoverColor}}; }'
                    }
                ]
            },
            buttonBgColor: {
                type: 'object', default: { type: 'color', openColor: 1, color: '#2184F9', gradient: { color1: '#1066CC', color2: '#2184F9', direction: 0, start: 0, stop: 100 } },
                style: [
                    {
                        condition: [
                            { key: 'buttonFillType', relation: '==', value: 'fill' }
                        ],
                        selector: '{{QUBELY}} .qubely-block-btn-anchor'
                    }
                ]
            },
            buttonBgHoverColor: {
                type: 'object', default: { type: 'color', openColor: 1, color: '#1066CC', gradient: { color1: '#2184F9', color2: '#1066CC', direction: 0, start: 0, stop: 100 } },
                style: [
                    {
                        selector: '{{QUBELY}} .qubely-block-btn-anchor:before'
                    }
                ]
            },

            buttonBorder: {
                type: 'object',
                default: {
                    openBorder: 1,
                    borderType: 'global',
                    global: {
                        md: 1
                    },
                    color: '#2184F9'
                },
                style: [
                    {
                        selector: '{{QUBELY}} .qubely-block-btn-anchor'
                    }
                ]
            },

            buttonBorderHoverColor: {
                type: 'string', default: '#1066CC',
                style: [
                    {
                        selector: '{{QUBELY}} .qubely-block-btn-anchor:hover {border-color: {{buttonBorderHoverColor}};}'
                    }
                ]
            },

            buttonBorderRadius: {
                type: 'object',
                default: {
                    openBorderRadius: 1,
                    radiusType: 'global',
                    global: {
                        md: 4
                    },
                    unit: 'px'
                },
                style: [
                    {
                        selector: '{{QUBELY}} .qubely-block-btn-anchor'
                    }
                ]
            },
            buttonShadow: {
                type: 'object', default: {},
                style: [
                    {
                        selector: '{{QUBELY}} .qubely-block-btn-anchor'
                    }
                ]
            },
            buttonHoverShadow: {
                type: 'object', default: {},
                style: [
                    {
                        selector: '{{QUBELY}} .qubely-block-btn-anchor:hover'
                    }
                ]
            },
            buttonIconName: { type: 'string', default: '' },
            buttonIconPosition: { type: 'string', default: 'right' },
            buttonIconSize: {
                type: 'object', default: {},
                style: [
                    {
                        condition: [
                            { key: 'buttonIconName', relation: '!=', value: '' }
                        ],
                        selector: '{{QUBELY}} .qubely-btn-icon {font-size: {{buttonIconSize}}}'
                    }
                ]
            },
            buttonIconGap: {
                type: 'object', default: { md: 8, unit: 'px' },
                style: [
                    {
                        condition: [
                            { key: 'buttonIconName', relation: '!=', value: '' },
                            { key: 'buttonIconPosition', relation: '==', value: 'left' },
                        ],
                        selector: '{{QUBELY}} .qubely-btn-icon { margin-right: {{buttonIconGap}}; }'
                    },
                    {
                        condition: [
                            { key: 'buttonIconName', relation: '!=', value: '' },
                            { key: 'buttonIconPosition', relation: '==', value: 'right' },
                        ],
                        selector: '{{QUBELY}} .qubely-btn-icon { margin-left: {{buttonIconGap}}; }'
                    },
                ]
            },
        }, settings.attributes)
    }
    return settings
}

const withInspectorControls = createHigherOrderComponent(OriginalComponent => {
    class QubelyWrappedComponent extends Component {
        constructor(props) {
            super(props)
            this.state = {
                device: 'md',
                showPostTextTypography: false
            }
        }

        renderButtonControls = () => {
            const { setAttributes,
                attributes: { enableButtonAlignment, buttonAlignment, buttonGap, buttonBlock, buttonTag, buttonFillType, buttonSize, buttonTypography, buttonPadding, buttonUrl, buttonBorderRadius, buttonIconName, buttonIconPosition, buttonIconSize, buttonIconGap, buttonBorder, buttonBorderHoverColor, buttonColor, buttonHoverColor, buttonBgColor, buttonBgHoverColor, buttonShadow, buttonHoverShadow } } = this.props
            const { device } = this.state
            return (
                <Fragment>
                    <Styles value={buttonFillType}
                        onChange={(value) => setAttributes({ buttonFillType: value })}
                        options={[
                            { value: 'fill', svg: icons.btn_fill, label: __('Fill') },
                            { value: 'outline', svg: icons.btn_outline, label: __('Outline') }
                        ]}
                    />
                    {buttonTag == 'a' &&
                        <Url label={__('URL')} value={buttonUrl} onChange={(value) => setAttributes({ buttonUrl: value })} />
                    }
                    {
                        enableButtonAlignment &&
                        <Alignment label={__('Alignment')} value={buttonAlignment} onChange={val => setAttributes({ buttonAlignment: val })} disableJustify />
                    }

                    <InnerPanel title={__('Size')}>
                        <RadioAdvanced
                            label={__('Button Size')}
                            options={[
                                { label: 'S', value: 'small', title: 'Small' },
                                { label: 'M', value: 'medium', title: 'Medium' },
                                { label: 'L', value: 'large', title: 'Large' },
                                { icon: 'fas fa-cog', value: 'custom', title: 'Custom' }
                            ]}
                            value={buttonSize}
                            onChange={(value) => setAttributes({ buttonSize: value })}
                        />
                        {buttonSize == 'custom' &&
                            <Padding
                                label={__('Padding')}
                                value={buttonPadding}
                                onChange={(value) => setAttributes({ buttonPadding: value })}
                                unit={['px', 'em', '%']}
                                max={150}
                                min={0}
                                responsive
                                device={device}
                                onDeviceChange={value => this.setState({ device: value })} />

                        }
                        <Toggle label={__('Full Width')} value={buttonBlock} onChange={val => setAttributes({ buttonBlock: val })} />
                    </InnerPanel>

                    <InnerPanel title={__('Design')} initialOpen={false}>
                        <Tabs>
                            <Tab tabTitle={__('Normal')}>
                                <Color label={__('Text Color')} value={buttonColor} onChange={(value) => setAttributes({ buttonColor: value })} />
                                {buttonFillType == 'fill' &&
                                    <ColorAdvanced label={__('Background')} value={buttonBgColor} onChange={(value) => setAttributes({ buttonBgColor: value })} />
                                }
                                <Border
                                    label={__('Border')}
                                    separator
                                    value={buttonBorder}
                                    min={0} max={10}
                                    onChange={val => setAttributes({ buttonBorder: val })}
                                />
                                <BoxShadow
                                    label={__('Box-Shadow')}
                                    value={buttonShadow}
                                    onChange={(value) => setAttributes({ buttonShadow: value })} />
                            </Tab>
                            <Tab tabTitle={__('Hover')}>
                                <Color label={__('Text Color')} value={buttonHoverColor} onChange={(value) => setAttributes({ buttonHoverColor: value })} />
                                <ColorAdvanced label={__('Background')} value={buttonBgHoverColor} onChange={(value) => setAttributes({ buttonBgHoverColor: value })} />
                                <Color label={__('Border Color')} value={buttonBorderHoverColor} onChange={(value) => setAttributes({ buttonBorderHoverColor: value })} />
                                <BoxShadow
                                    label={__('Box-Shadow')}
                                    value={buttonHoverShadow}
                                    onChange={(value) => setAttributes({ buttonHoverShadow: value })} />
                            </Tab>
                        </Tabs>

                        <BorderRadius
                            label={__('Radius')}
                            value={buttonBorderRadius}
                            onChange={(value) => setAttributes({ buttonBorderRadius: value })}
                            min={0}
                            max={100} unit={['px', 'em', '%']}
                            responsive
                            device={device}
                            onDeviceChange={value => this.setState({ device: value })} />
                        <Range
                            label={__('Gap')}
                            value={buttonGap}
                            min={0}
                            max={100}
                            responsive
                            unit={['px', 'em', '%']}
                            onChange={(value) => setAttributes({ buttonGap: value })}
                            device={device}
                            onDeviceChange={value => this.setState({ device: value })}
                        />
                    </InnerPanel>

                    <InnerPanel title={__('Icon')} initialOpen={false}>
                        <IconList
                            label={__('Icon')}
                            value={buttonIconName}
                            onChange={(value) => this.props.setAttributes({ buttonIconName: value })} />
                        {buttonIconName &&
                            <Fragment>
                                <Select
                                    label={__('Position')}
                                    options={['left', 'right']}
                                    value={buttonIconPosition}
                                    onChange={(value) => setAttributes({ buttonIconPosition: value })} />
                                <Range
                                    label={__('Size')}
                                    value={buttonIconSize}
                                    onChange={(value) => setAttributes({ buttonIconSize: value })}
                                    unit={['px', 'em', '%']}
                                    min={5}
                                    max={48}
                                    responsive
                                    device={device}
                                    onDeviceChange={value => this.setState({ device: value })} />
                                <Range
                                    label={__('Gap')}
                                    value={buttonIconGap}
                                    onChange={val => setAttributes({ buttonIconGap: val })}
                                    unit={['px', 'em', '%']}
                                    min={0}
                                    max={64}
                                    responsive
                                    device={device}
                                    onDeviceChange={value => this.setState({ device: value })} />
                            </Fragment>
                        }
                    </InnerPanel>

                    <InnerPanel title={__('Typography')} initialOpen={false}>
                        <Typography
                            value={buttonTypography}
                            onChange={(value) => setAttributes({ buttonTypography: value })}
                            disableLineHeight
                            device={device}
                            onDeviceChange={value => this.setState({ device: value })} />
                    </InnerPanel>
                </Fragment>
            )
        }
        render() {
            const { setAttributes,
                attributes: { uniqueId, buttonComponent, controlledButtonPanel, showButtonPanel, enableButton, enablePostButtonText, postButtonTextTypography, postButtonTextColor, postButtonTextHoverColor, postButtonTextPaddingBottom, postButtonTextPaddingTop }
            } = this.props
            const { showPostTextTypography, device } = this.state
            let type = this.props.name.split("/")[0]
            let blockName = this.props.name.split("/")[1]
            if (uniqueId) { CssGenerator(this.props.attributes, blockName, uniqueId); }
            if (type !== 'qubely' || buttonComponent != true) {
                return <OriginalComponent {...this.props} />
            } else {
                return (
                    <Fragment>
                        <OriginalComponent {...this.props} />
                        <InspectorControls key="inspector">
                            {enableButton == 1 &&
                                <Fragment>
                                    {
                                        controlledButtonPanel ?
                                            <PanelBody title={__('Button')} opened={showButtonPanel} onToggle={() => setAttributes({ showButtonPanel: !showButtonPanel })}>
                                                {this.renderButtonControls()}
                                            </PanelBody>
                                            :
                                            <PanelBody title={__('Button')} initialOpen={false}>
                                                {this.renderButtonControls()}
                                            </PanelBody>
                                    }
                                </Fragment>
                            }
                            {
                                enablePostButtonText &&

                                <PanelBody title={__('Post Button Text')} initialOpen={false}>
                                    <Tabs>
                                        <Tab tabTitle={__('Normal')}>
                                            <Color
                                                label={__('Color')}
                                                value={postButtonTextColor}
                                                onChange={val => setAttributes({ postButtonTextColor: val })} />

                                        </Tab>
                                        <Tab tabTitle={__('Hover')}>
                                            <Color
                                                label={__('Color')}
                                                value={postButtonTextHoverColor}
                                                onChange={val => setAttributes({ postButtonTextHoverColor: val })} />
                                        </Tab>
                                    </Tabs>
                                    <Toggle
                                        value={showPostTextTypography}
                                        label={__('Typography')}
                                        onChange={val => this.setState({ showPostTextTypography: val })} />
                                    {
                                        showPostTextTypography &&
                                        <Typography
                                            value={postButtonTextTypography}
                                            onChange={val => setAttributes({ postButtonTextTypography: val })}
                                            device={device}
                                            onDeviceChange={value => this.setState({ device: value })} />
                                    }
                                    <Range
                                        min={-50}
                                        max={200}
                                        responsive
                                        value={postButtonTextPaddingTop}
                                        unit={['px', 'em', '%']}
                                        label={"Top"}
                                        onChange={val => setAttributes({ postButtonTextPaddingTop: val })}
                                        device={device}
                                        onDeviceChange={value => this.setState({ device: value })} />
                                    <Range
                                        min={-50}
                                        max={200}
                                        responsive
                                        value={postButtonTextPaddingBottom}
                                        unit={['px', 'em', '%']}
                                        label={"Bottom"}
                                        onChange={val => setAttributes({ postButtonTextPaddingBottom: val })}
                                        device={device}
                                        onDeviceChange={value => this.setState({ device: value })} />

                                </PanelBody>
                            }
                        </InspectorControls>
                    </Fragment>
                )
            }
        }
    }
    return QubelyWrappedComponent
}, "withInspectorControl");

wp.hooks.addFilter('blocks.registerBlockType', 'qubely/extendbutton', addAttribute, 5)
wp.hooks.addFilter('editor.BlockEdit', 'qubely/extendbutton', withInspectorControls, 10)

