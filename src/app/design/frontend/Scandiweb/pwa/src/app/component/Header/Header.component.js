/**
 * @category  Budo
 * @package   Budo_PWA
 * @author    Ivans Zuks <info@scandiweb.com>
 * @copyright Copyright (c) 2020 Scandiweb, Inc (https://scandiweb.com)
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 */

import {
    CART_OVERLAY,
    Header as BaseHeader
} from 'SourceComponent/Header/Header.component';
import CartOverlay from 'Component/CartOverlay';
import ClickOutside from 'Component/ClickOutside';
import MyAccountOverlay from 'Component/MyAccountOverlay';
import OfflineNotice from 'Component/OfflineNotice';
import Menu from 'Component/Menu';
import isMobile from 'SourceUtil/Mobile';

export {
    CART,
    CART_EDITING,
    CART_OVERLAY,
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

    renderAccountButton(isVisible = false) {
        const {
            onMyAccountOutsideClick,
            onMyAccountButtonClick,
            isCheckout,
            showMyAccountLogin,
            closeOverlay,
            onSignIn
        } = this.props;

        if (isMobile.any() && !isCheckout) {
            return null;
        }

        if (isCheckout && isSignedIn()) {
            return null;
        }

        return (
            <ClickOutside onClick={ onMyAccountOutsideClick } key="account">
                <div
                    aria-label="My account"
                    block="Header"
                    elem="MyAccount"
                >
                    <div
                        block="Header"
                        elem="Button"
                        mods={ {isVisible, type: 'account'} }
                        elem="MyAccountWrapper"
                        role="button"
                        tabIndex="0"
                        onClick={ onMyAccountButtonClick }
                    >
                        <div
                            block="Header"
                            elem="MyAccountTitle"
                        >
                            { __('Account') }
                        </div>
                        <button
                            block="Header"
                            elem="Button"
                            mods={ {isVisible, type: 'account'} }
                            aria-label="Open my account"
                            id="myAccount"
                        />
                    </div>

                    { ((isMobile.any() && showMyAccountLogin) || !isMobile.any()) && (
                        <MyAccountOverlay
                            onSignIn={ onSignIn }
                            closeOverlay={ closeOverlay }
                            isCheckout={ isCheckout }
                        />
                    ) }
                </div>
            </ClickOutside>
        );
    }

    renderMenu() {
        const { isCheckout } = this.props;

        if (isMobile.any() || isCheckout) {
            return null;
        }

        return <Menu />;
    }

    renderMinicartButton(isVisible = false) {
        const {
            onMinicartOutsideClick,
            onMinicartButtonClick,
            isCheckout,
            navigationState: { name }
        } = this.props;

        if (isMobile.any() || isCheckout) {
            return null;
        }

        return (
            <ClickOutside onClick={ onMinicartOutsideClick } key="minicart">
                <div
                    block="Header"
                    elem="Button"
                    mods={ {isVisible, type: 'minicart'} }
                >
                    <div
                        block="Header"
                        elem="MinicartButtonWrapper"
                        role="button"
                        tabIndex="0"
                        onClick={ () => {
                            if (name !== CART_OVERLAY) {
                                onMinicartButtonClick();
                            }
                        } }
                    >
                        <span
                            block="Header"
                            elem="MinicartTitle"
                        >
                            { __('Cart') }
                        </span>
                        <span
                            aria-label="Minicart"
                            block="Header"
                            elem="MinicartIcon"
                        />
                        { this.renderMinicartItemsQty() }
                    </div>
                    <CartOverlay />
                </div>
            </ClickOutside>
        );
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
