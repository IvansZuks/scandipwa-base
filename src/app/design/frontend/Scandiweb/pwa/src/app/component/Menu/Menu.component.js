/* eslint-disable jsx-a11y/click-events-have-key-events */
/**
 * @category  Budo
 * @package   Budo_PWA
 * @author    Ivans Zuks <info@scandiweb.com>
 * @copyright Copyright (c) 2020 Scandiweb, Inc (https://scandiweb.com)
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 */

import { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Link from 'Component/Link';
import isMobile from 'SourceUtil/Mobile';
import { MenuType } from 'Type/Menu';
import CmsBlock from 'Component/CmsBlock';
import { getSortedItems } from 'SourceUtil/Menu';
import StoreSwitcher from 'Component/StoreSwitcher';
import MenuItem from 'Component/MenuItem';
import Image from 'Component/Image';
import media from 'Util/Media';

import './Menu.style';

export default class MenuOverlay extends PureComponent {
    static propTypes = {
        menu: MenuType.isRequired,
        activeMenuItemsStack: PropTypes.array.isRequired,
        handleSubcategoryClick: PropTypes.func.isRequired,
        closeMenu: PropTypes.func.isRequired,
        onCategoryHover: PropTypes.func.isRequired
    };

    renderDesktopSubLevelItems(item, mods) {
        const { item_id } = item;
        const { closeMenu, activeMenuItemsStack } = this.props;

        return (
            <MenuItem
                activeMenuItemsStack={ activeMenuItemsStack }
                item={ item }
                itemMods={ mods }
                closeMenu={ closeMenu }
                isLink
                key={ item_id }
            />
        );
    }

    renderDesktopSubLevel(category) {
        const { children, item_class, item_id } = category;
        const childrenArray = getSortedItems(Object.values(children));

        if (isMobile.any() || !childrenArray.length) {
            return null;
        }

        const isBanner = item_class === 'Menu-ItemFigure_type_banner';
        const isLogo = item_class === 'Menu-ItemFigure_type_logo';
        const mods = {
            isBanner: !!isBanner,
            isLogo: !!isLogo
        };

        return (
            <div
                block="Menu"
                elem="SubLevelDesktop"
                key={ item_id }
            >
                <div
                    block="Menu"
                    elem="ItemList"
                    mods={ { ...mods } }
                >
                    { childrenArray.map(item => this.renderDesktopSubLevelItems(item, mods)) }
                </div>
            </div>
        );
    }

    renderSubLevelItems = (item) => {
        const {
            handleSubcategoryClick,
            activeMenuItemsStack,
            onCategoryHover
        } = this.props;
        const {
            item_id,
            children
        } = item;

        const childrenArray = Object.values(children);
        const subcategoryMods = { type: 'subcategory' };

        if (childrenArray.length && isMobile.any()) {
            return (
                <div
                    key={ item_id }
                    onClick={ e => handleSubcategoryClick(e, item) }
                    tabIndex="0"
                    role="button"
                >
                    <MenuItem
                        activeMenuItemsStack={ activeMenuItemsStack }
                        item={ item }
                        itemMods={ subcategoryMods }
                        onCategoryHover={ onCategoryHover }
                    />
                    { this.renderSubLevel(item) }
                </div>
            );
        }

        return (
            <div
                block="Menu"
                elem="SubItemWrapper"
                key={ item_id }
            >
                <MenuItem
                    activeMenuItemsStack={ activeMenuItemsStack }
                    item={ item }
                    isLink
                />
                { this.renderDesktopSubLevel(item) }
            </div>
        );
    };

    renderSubLevel(category) {
        const { activeMenuItemsStack } = this.props;
        const { item_id, children } = category;
        const childrenArray = getSortedItems(Object.values(children));
        const isVisible = activeMenuItemsStack.includes(item_id);
        const subcategoryMods = { type: 'subcategory' };

        return (
            <div
                block="Menu"
                elem="SubMenu"
                mods={ { isVisible } }
                key={ item_id }
            >
                <div
                    block="Menu"
                    elem="ItemList"
                    mods={ { ...subcategoryMods } }
                >
                    { childrenArray.map(this.renderSubLevelItems) }
                </div>
            </div>
        );
    }

    renderPromotionCms() {
        const { closeMenu } = this.props;
        const { header_content: { header_cms } = {} } = window.contentConfiguration;

        if (header_cms) {
            return <CmsBlock identifiers={ [header_cms] } />;
        }

        return (
            <div block="Menu" elem="Promotion">
                <h3 block="Menu" elem="PageLink">
                    <Link
                        to="/page/about-us"
                        onClick={ closeMenu }
                        block="Menu"
                        elem="Link"
                    >
                        { __('ABOUT US') }
                    </Link>
                </h3>
                <h3 block="Menu" elem="PageLink">
                    <Link
                        to="/page/about-us"
                        onClick={ closeMenu }
                        block="Menu"
                        elem="Link"
                    >
                        { __('CONTACTS') }
                    </Link>
                </h3>
                <div block="Menu" elem="Social">
                    <CmsBlock identifiers={ ['social-links'] } />
                </div>
            </div>
        );
    }

    renderSubMenuDesktopItems = (item) => {
        const { item_id, children } = item;

        if (!Object.keys(children).length) {
            return null;
        }

        const { activeMenuItemsStack, closeMenu } = this.props;
        const mods = activeMenuItemsStack.includes(item_id);

        return (
            <div
                block="Menu"
                elem="SubCategoriesWrapper"
                mods={ { isVisible: mods } }
                key={ item_id }
            >
                <div
                    block="Menu"
                    elem="SubCategoriesWrapperInner"
                >
                    <div
                        block="Menu"
                        elem="SubCategoriesFullWidthWrapper"
                    >
                        <div
                            block="Menu"
                            elem="SubCategoriesContentWrapper"
                        >
                            <div
                                block="Menu"
                                elem="SubCategories"
                            >
                                { this.renderSubLevel(item) }
                            </div>
                        </div>
                        <div
                            block="Menu"
                            elem="Image"
                        >
                            <Image
                                alt={ 'logo_alt' }
                                src={ media(item.icon) }
                                ratio="16x9"
                            />
                        </div>
                    </div>
                </div>
                <div
                    block="Menu"
                    elem="Overlay"
                    onMouseEnter={ closeMenu }
                />
            </div>
        );
    };

    renderSubMenuDesktop(itemList) {
        if (isMobile.any()) {
            return null;
        }

        const childrenArray = getSortedItems(Object.values(itemList));

        return childrenArray.map(this.renderSubMenuDesktopItems);
    }

    renderAdditionalInformation(checkMobile = false) {
        if (checkMobile && !isMobile.any()) {
            return null;
        }

        return (
            <>
                { this.renderStoreSwitcher() }
                { this.renderPromotionCms() }
            </>
        );
    }

    renderFirstLevelItems(item) {
        const {
            activeMenuItemsStack,
            handleSubcategoryClick,
            onCategoryHover
        } = this.props;
        const { children } = item;
        const childrenArray = Object.values(children);
        const itemMods = { type: 'main' };

        if (childrenArray.length && isMobile.any()) {
            return (
                <div
                    onClick={ e => handleSubcategoryClick(e, item) }
                    tabIndex="0"
                    block="Menu"
                    elem="SubCatLink"
                    role="button"
                >
                    <MenuItem
                        activeMenuItemsStack={ activeMenuItemsStack }
                        item={ item }
                        itemMods={ itemMods }
                        onCategoryHover={ onCategoryHover }
                    />
                    { this.renderSubLevel(item) }
                </div>
            );
        }

        return (
            <MenuItem
                activeMenuItemsStack={ activeMenuItemsStack }
                item={ item }
                itemMods={ itemMods }
                onCategoryHover={ onCategoryHover }
                isLink
            />
        );
    }

    renderFirstLevel = (item) => {
        const { item_id } = item;

        return (
            <li key={ item_id } block="Menu" elem="Item">
                { this.renderFirstLevelItems(item) }
            </li>
        );
    };

    renderTopLevel() {
        const { menu } = this.props;
        const categoryArray = Object.values(menu);

        if (!categoryArray.length) {
            return null;
        }

        const [{ children, title: mainCategoriesTitle }] = categoryArray;

        const childrenArray = getSortedItems(Object.values(children));

        return (
            <>
                <div block="Menu" elem="MainCategories">
                    <ul
                        block="Menu"
                        elem="ItemList"
                        mods={ { type: 'main' } }
                        aria-label={ mainCategoriesTitle }
                    >
                        { childrenArray.map(this.renderFirstLevel) }
                    </ul>
                    { this.renderAdditionalInformation(true) }
                </div>
                { this.renderSubMenuDesktop(children) }
            </>
        );
    }

    renderStoreSwitcher() {
        return <StoreSwitcher />;
    }

    render() {
        const { closeMenu } = this.props;

        return (

            <div
                block="Menu"
                elem="MenuWrapper"
                onMouseLeave={ closeMenu }
            >
                { this.renderTopLevel() }
            </div>

        );
    }
}