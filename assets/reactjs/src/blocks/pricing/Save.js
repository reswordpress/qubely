const { Component, Fragment } = wp.element
const { InnerBlocks, RichText } = wp.editor
import { QubelyButtonSave, QubelyIconListSave } from '../../components/FieldRender'
import { animationAttr } from '../../components/HelperFunction'

class Save extends Component {


    renderPricingTitle = () => {
        const { attributes: { title } } = this.props
        return (
            <Fragment>
                <span className="qubely-pricing-title-wrapper">
                    <RichText.Content className="qubely-pricing-title" tagName="div" value={title} />
                </span>
            </Fragment>
        )
    }

    renderPricingSubTitle = () => {
        const { attributes: { subTitle } } = this.props
        return (
            <div className="qubely-sub-title-wrapper" >
                <RichText.Content className="qubely-sub-title" tagName="div" value={subTitle} />
            </div>
        )
    }

    renderPricingPrice = () => {
        const { attributes: { currencyPosition, discount, discountPrice, price, enableDuration, durationPosition } } = this.props
        return (
            <div className="qubely-pricing-wrapper" >
                {currencyPosition == 'before' && this.renderCurrencyContent()}
                <span className="qubely-pricing-price">
                    {discount && <strike>{discountPrice}</strike>}
                    {price}
                </span>
                {currencyPosition == 'after' && this.renderCurrencyContent()}
                {enableDuration && durationPosition == 'side' && this.renderDuration()}
            </div>
        )
    }


    renderDuration = () => {
        const { attributes: { duration } } = this.props
        return (
            <span className="qubely-pricing-duration">
                <RichText.Content className="qubely-product-duration" tagName="div" value={duration} />
            </span>
        )
    }
    renderCurrencyContent = () => {
        const { attributes: { currency, currencyCustom } } = this.props
        return (<span className="qubely-pricing-currency">{currency == 'custom' ? currencyCustom : currency}</span>)
    }


    renderPricingButton = () => {
        const {
            setAttributes,
            attributes: { enableButton, buttonFillType, buttonSize, buttonText, buttonIconName, buttonIconPosition, buttonTag, enablePostButtonText, postButtonText }
        } = this.props

        return (
            <div className={`qubely-pricing-button`} >
                <QubelyButtonSave
                    buttonFillType={buttonFillType}
                    buttonSize={buttonSize}
                    buttonText={buttonText}
                    buttonIconName={buttonIconName}
                    buttonIconPosition={buttonIconPosition}
                // buttonUrl={buttonUrl}
                />
                {
                    enablePostButtonText &&
                    <div className="qubely-pricing-postbutton-text">
                        <span className="qubely-pricing-post-button-text">{postButtonText} </span>
                    </div>
                }
            </div>
        )
    }
    renderPricingContent = () => {
        const { attributes: { currencyPosition, discount, discountPrice, price, enableDuration, durationPosition } } = this.props
        return (
            <div className="qubely-pricing-wrapper" >
                {currencyPosition == 'before' && this.renderCurrencyContent()}
                <span className="qubely-pricing-price" >
                    {discount && <strike>{discountPrice}</strike>}
                    {price}
                </span>
                {currencyPosition == 'after' && this.renderCurrencyContent()}
                {enableDuration && durationPosition == 'side' && this.renderDuration()}
            </div>
        )
    }

    render() {
        const { uniqueId, pricings, id, title, desc, listType, listAlignment, bulletStyle, blockFeatures, layout,
            currencyPosition,
            price, defaulPricePosition,
            discount, discountPrice,
            iconColor, enableListIcons,
            enableDuration, durationPosition,
            enableFeatures, iconPosition,
            defaultbuttonPosition,
            enableBadge, badge,
            animation } = this.props.attributes
        const listTag = listType == 'ordered' ? 'ol' : 'ul'
        return (
            <div className={`qubely-block-${uniqueId}`} {...animationAttr(animation)}>
                <div className={`qubely-block-pricing`}>
                    <div className="qubely-block-pricing-header">
                        {this.renderPricingTitle()}

                        {(layout == 3 || layout == 4) &&
                            this.renderPricingSubTitle()
                        }

                        {this.renderPricingPrice()}
                        {enableDuration && durationPosition == 'bottom' && this.renderDuration()}

                        {(layout == 2) &&
                            this.renderPricingSubTitle()
                        }
                    </div>

                    {(layout == 4) &&
                        this.renderPricingButton()
                    }

                    {
                        enableFeatures &&
                        <div className={`qubely-pricing-features qubely-alignment-${listAlignment}`} >
                            <QubelyIconListSave
                                listItems={blockFeatures}
                                enableListIcons={enableListIcons}
                                iconColor={iconColor}
                                iconPosition={iconPosition}
                                listWrapperClassName={`qubely-list icon-position-${iconPosition}`}
                            />
                        </div>
                    }

                    {(layout == 1 || layout == 2 || layout == 3 || layout == 5) &&
                        this.renderPricingButton()
                    }
                    {enableBadge && <span className={`qubely-pricing-badge`} > {badge} </span>}

                </div>
            </div>
        )
    }
}
export default Save