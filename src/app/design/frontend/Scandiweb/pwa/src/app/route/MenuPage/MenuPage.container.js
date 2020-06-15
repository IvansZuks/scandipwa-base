/*
 * @category  Budo
 * @package   Budo_PWA
 * @author    Ivans Zuks <info@scandiweb.com>
 * @copyright Copyright (c) 2020 Scandiweb, Inc (https://scandiweb.com)
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 */

import { connect } from 'react-redux';
import { updateMeta } from 'Store/Meta';
import Menu from 'Component/Menu';
import { withRouter } from 'react-router';
import { MenuPageContainer as BaseMenuPageContainer } from 'SourceRoute/MenuPage/MenuPage.container';
import './MenuPage.style';

export const mapDispatchToProps = dispatch => ({
    updateMeta: meta => dispatch(updateMeta(meta))
});

export class MenuPageContainer extends BaseMenuPageContainer {
    render() {
        return (
            <main block="MenuPage">
                <Menu />
            </main>
        );
    }
}

export default withRouter(connect(null, mapDispatchToProps)(MenuPageContainer));
