const { __ } = wp.i18n;
import './editor.scss'
import './blocks/scss/style.scss'

import './blocks/row'           // Row
import './blocks/row/column'    // Column
import './blocks/button'        // Button
import './blocks/text'          // Text
import './blocks/icon'          // Icon
import './blocks/map'           // Map
import './blocks/divider'       // Divider
import './blocks/infobox'       // Info Box
import './blocks/testimonial'   // Testimonial
import './blocks/accordion'     // Accordion
import './blocks/heading'       // Heading Box
import './blocks/videopopup'    // Video popup
import './blocks/progressbar'   // Progress Bar
import './blocks/counter'       // counter
import './blocks/tabs'          // Tabs
import './blocks/tabs/tab'      // Inner Tabs
import './blocks/socialicons'   // Social Icons
import './blocks/form'          // Form
import './blocks/contactform'   // Contact Form
import './blocks/buttongroup'   // Button Group
import './blocks/advancedlist'  // Advanced List
import './blocks/iconlist'      // Icon List
import './blocks/wrapper'       // Wrapper
import './blocks/team'          // Team
import './blocks/pricing'       // pricing 
// import './blocks/carousel'      //carousel
// import './blocks/carousel/carouselitem' //carousel item

// Global Settings
import './blocks/pagesettings'
import './customizer'

window.qubelyDevice = 'md'
window.bindCss = false
window.globalData = {}
window.globalSaving = false

// Save CSS in Database/File
import ParseCss from './helpers/ParseCss'
wp.data.subscribe(() => {
    const { isSavingPost, isAutosavingPost } = wp.data.select("core/editor")
    if (isSavingPost() && (!isAutosavingPost())) {
        if (window.bindCss === false) {
            ParseCss();
        }
    }
});
//UPDATE BLOCK CATEGORY ICON
wp.blocks.updateCategory('qubely', { icon: <img style={{ height: '20px', 'margin-top': '-2px' }} src={qubely_admin.plugin + 'assets/img/blocks/block-qubely.svg'} alt={__('Qubely')} /> });

//APPEND IMPORT LAYOUTS BUTTON TO POST HEADER TOOLBAR
import { ModalManager } from './helpers/ModalManager';
import PageListModal from './helpers/PageListModal';
document.addEventListener("DOMContentLoaded", appendImportButton);

function appendImportButton() {
    let node = document.querySelector('.edit-post-header-toolbar');
    let newElem = document.createElement('div');
    let html = '<div class="qubely-import-layout-btn-container">';
    html += `<button id="qubelyImportLayoutBtn" title=${__("Qubely")}><img src=${qubely_admin.plugin}assets/img/qubely-logo-white.svg alt=${__("Qubely")} /> ${__("Import Layout")}</button>`;
    html += '</div>';
    newElem.innerHTML = html;
    node.appendChild(newElem);
    document.getElementById("qubelyImportLayoutBtn").addEventListener("click", qubelyImportLayout);
}
function qubelyImportLayout() {
    ModalManager.open(<PageListModal rowClientId={false} />);
}

//DEACTIVATE BLOCKS
let qubely_deactivated_blocks = qubely_admin.unregistered_blocks;
if ( ! qubely_deactivated_blocks.length ) { // convert object into an array.
	qubely_deactivated_blocks = Object.keys( qubely_deactivated_blocks ).map( key => qubely_deactivated_blocks[ key ] )
}
if ( typeof wp.blocks.unregisterBlockType !== "undefined" ) {
	qubely_deactivated_blocks.forEach( block => wp.blocks.unregisterBlockType( block ) )
}