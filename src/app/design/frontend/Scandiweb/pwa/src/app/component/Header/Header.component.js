/*
 * @category  Budo
 * @package   Budo_PWA
 * @author    Ivans Zuks <info@scandiweb.com>
 * @copyright Copyright (c) 2020 Scandiweb, Inc (https://scandiweb.com)
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 */

import { Header as BaseHeader } from 'SourceComponent/Header/Header.component';
import OfflineNotice from 'Component/OfflineNotice';
import Menu from 'Component/Menu';
import isMobile from 'SourceUtil/Mobile';

export {
    CART,
    CART_EDITING,
    CHECKOUT,
    CMS_PAGE,
    PDP,
    POPUP,
    CATEGORY,
    CUSTOMER_ACCOUNT,
    CUSTOMER_SUB_ACCOUNT,
    CUSTOMER_ACCOUNT_PAGE,
    HOME_PAGE,
    MENU,
    MENU_SUBCATEGORY,
    SEARCH,
    FILTER,
    MY_ACCOUNT
} from 'SourceComponent/Header/Header.component';

export class Header extends BaseHeader {
    renderMap = {
        cancel: this.renderCancelButton.bind(this),
        back: this.renderBackButton.bind(this),
        close: this.renderCloseButton.bind(this),
        search: this.renderSearchField.bind(this),
        title: this.renderTitle.bind(this),
        logo: this.renderLogo.bind(this),
        account: this.renderAccountButton.bind(this),
        minicart: this.renderMinicartButton.bind(this),
        clear: this.renderClearButton.bind(this),
        edit: this.renderEditButton.bind(this),
        ok: this.renderOkButton.bind(this)
    };

    renderMenu() {
        const { isCheckout } = this.props;

        if (isMobile.any() || isCheckout) {
            return null;
        }

        return <Menu />;
    }

    render() {
        const {
            navigationState: { name, isHiddenOnMobile = false },
            isCheckout
        } = this.props;

        return (
            <>
                <header block="Header" mods={ { name, isHiddenOnMobile, isCheckout } }>
                    <nav block="Header" elem="Nav">
                        { this.renderNavigationState() }
                    </nav>
                    { this.renderMenu() }
                </header>
                <OfflineNotice />
            </>
        );
    }
}

export default middleware(Header, 'Component/Header/Component');
