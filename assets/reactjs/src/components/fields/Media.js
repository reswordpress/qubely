import '../css/media.scss'
export const { Tooltip, Dashicon } = wp.components;
const { MediaUpload } = wp.editor;
const { Component } = wp.element;
const {__} = wp.i18n

class Media extends Component {

	setSettings( media ) {
		const { multiple, onChange,value} = this.props
		if( multiple ){
			let medias = [];
			media.forEach( single => {
				if ( single && single.url ){
					medias.push( {url: single.url, id: single.id} );
				}
			});
			onChange( value ? value.concat(medias) : medias );
		}else{
			if ( media && media.url ) {
				onChange({url: media.url, id: media.id});
			}
		}
	}

	removeImage( id ){
		const { multiple, onChange } = this.props
		if( multiple ){
			let value = (this.props.value).slice()
			value.splice(id, 1)
			onChange( value )
		}else{
			onChange({})
		}
	}

	isUrl(url){
		if( ['wbm','jpg','jpeg','gif','png'].indexOf( url.split('.').pop().toLowerCase() ) != -1 ){
			return url;
		}else{
			return qubely_admin.plugin+'assets/img/qubely-medium.jpg';
		}
	}
	

	render() {
		const { type,multiple,value,panel } = this.props;
		return (
			<div className='qubely-media'>
				{ this.props.label &&
					<label>{this.props.label}</label>
				}
				<MediaUpload
					onSelect={ val => this.setSettings(val) }
					allowedTypes={ type || ['image'] }
					multiple={ multiple || false }
					value={ value }
					render={({ open }) => (
						<div className="qubely-single-img">
							<div>
								{ multiple ?
									<div>
										{ ( value.length > 0 ) &&
											value.map( (v,index) => {
												return(
													<span className="qubely-media-image-parent">
														<img src={this.isUrl(v.url)} alt={__('image')}/>
														{ panel &&
															<button aria-label="Close" className="qubely-image-close-icon fas fa-times" onClick={ () => this.removeImage(index) }></button>
														}
													</span>
												)
											} )
										}
										<div onClick={open} className={"qubely-placeholder-image"}><Dashicon icon="insert" /><span>{__('Insert')}</span></div>
									</div>
									:
									( ( value && value.url ) ? 
										<span className="qubely-media-image-parent"> 
											<img src={this.isUrl(value.url)} alt={__('image')}/>
											{ panel &&
												<button aria-label="Close" className="qubely-image-close-icon goo fas fa-times" onClick={ () => this.removeImage(value.id) }></button>
											}
										</span>
										:
										<div onClick={open} className={"qubely-placeholder-image"}><Dashicon icon="insert" /><span>{__('Insert')}</span></div>
									)
								}
							</div>
						</div>
					)}
				/>
			</div>
		);
	}
}
export default Media;