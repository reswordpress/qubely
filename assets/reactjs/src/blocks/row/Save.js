import './style.scss'
const { Component } = wp.element
const { InnerBlocks } = wp.editor
import { videoBackground } from '../../components/HelperFunction'
import { animationAttr } from '../../components/HelperFunction'

class Save extends Component {
	render() {
		const { attributes:{ uniqueId, animation, rowId, rowBg, shapeTop, shapeBottom, align, heightOptions }} = this.props
		return(
			<div className={`qubely-section qubely-block-${uniqueId} ${(rowBg.bgimgParallax && rowBg.bgimgParallax == 'animated') ? 'qubely-section-parallax' : ''}`} {...rowId ? {id:rowId} : ''} {...animationAttr(animation)}>

				{ ( Object.entries(shapeTop).length > 1 && shapeTop.openShape == 1 && shapeTop.style ) &&
					<div className="qubely-shape-divider qubely-top-shape" dangerouslySetInnerHTML={{ __html: qubely_admin.shapes[shapeTop.style] }} />
				}
				{ ( Object.entries(rowBg).length > 0 && rowBg.openBg == 1 && rowBg.bgType == 'video' ) &&
					videoBackground(rowBg, 'row')
				}
				{ ( Object.entries(shapeBottom).length > 1 && shapeBottom.openShape == 1 && shapeBottom.style ) &&
					<div className="qubely-shape-divider qubely-bottom-shape" dangerouslySetInnerHTML={{ __html: qubely_admin.shapes[shapeBottom.style] }} />
				}
				<div className="qubely-row-overlay"></div>
				<div className="qubely-container">
					<div className={`qubely-row qubely-backend-row ${(heightOptions == 'window') ? 'qubely-row-height-window':''}`}>
						<InnerBlocks.Content />
					</div>
				</div>
			</div>
		)
	}
}
export default Save