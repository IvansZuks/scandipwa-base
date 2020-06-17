/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/base-theme
 */

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { updateMeta } from 'Store/Meta';
import { CartDispatcher } from 'Store/Cart';
import { ConfigDispatcher } from 'Store/Config';
import { WishlistDispatcher } from 'Store/Wishlist';
import { HeaderAndFooterDispatcher } from 'Store/HeaderAndFooter';
import { RouterContainer as BaseRouterContainer } from 'SourceComponent/Router/Router.container';

export const mapStateToProps = state => ({
    isLoading: state.ConfigReducer.isLoading,
    default_description: state.ConfigReducer.default_description,
    default_keywords: state.ConfigReducer.default_keywords,
    default_title: state.ConfigReducer.default_title,
    title_prefix: state.ConfigReducer.title_prefix,
    title_suffix: state.ConfigReducer.title_suffix,
    isOffline: state.OfflineReducer.isOffline,
    isBigOffline: state.OfflineReducer.isBig
});

export const mapDispatchToProps = dispatch => ({
    updateMeta: meta => dispatch(updateMeta(meta)),
    init: (options) => {
        WishlistDispatcher.updateInitialWishlistData(dispatch);
        CartDispatcher.updateInitialCartData(dispatch);
        ConfigDispatcher.handleData(dispatch);
        HeaderAndFooterDispatcher.handleData(dispatch, options);
    }
});

export class RouterContainer extends BaseRouterContainer {
    getCmsBlocksToRequest() {
        const blocks = Object.values(window.contentConfiguration).reduce(
            (acc, config) => [
                ...acc,
                ...Object.entries(config).reduce(
                    (acc, [key, identifier]) => ((key.indexOf('cms') === -1)
                        ? acc
                        : [...acc, identifier]
                    ),
                    []
                )
            ],
            []
        ).filter((value, index, self) => value && self.indexOf(value) === index);

        return blocks.length ? blocks : [
            'social-links',
            'footer-payment-images',
            'footer-contact-us',
            'footer-information-block',
            'footer-shops-block',
            'footer-catalog-block',
            'header-contact-us',
            'header-cms-block'
        ];
    }
}

export default connect(
    middleware(mapStateToProps, 'Component/Router/Container/mapStateToProps'),
    middleware(mapDispatchToProps, 'Component/Router/Container/mapDispatchToProps')
)(
    middleware(RouterContainer, 'Component/Router/Container')
);
