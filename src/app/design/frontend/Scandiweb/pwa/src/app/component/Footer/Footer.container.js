/**
 * @category  Budo
 * @package   Budo_PWA
 * @author    Ivans Zuks <info@scandiweb.com>
 * @copyright Copyright (c) 2020 Scandiweb, Inc (https://scandiweb.com)
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 */

import { connect } from 'react-redux';
import { CmsBlocksAndSliderDispatcher } from 'Store/CmsBlocksAndSlider';
import Footer from './Footer.component';

export const mapStateToProps = state => ({
    copyright: state.ConfigReducer.copyright,
    blocks: state.CmsBlocksAndSliderReducer.blocks
});

export const mapDispatchToProps = dispatch => ({});

export default connect(
    middleware(mapStateToProps, 'Component/Footer/Container/mapStateToProps'),
    middleware(mapDispatchToProps, 'Component/Footer/Container/mapDispatchToProps')
)(Footer);
