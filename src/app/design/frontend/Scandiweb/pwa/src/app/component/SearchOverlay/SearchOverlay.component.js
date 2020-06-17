/**
 * @category  Budo
 * @package   Budo_PWA
 * @author    Ivans Zuks <info@scandiweb.com>
 * @copyright Copyright (c) 2020 Scandiweb, Inc (https://scandiweb.com)
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 */

import { SearchOverlay as BaseSearchOverlay } from 'SourceComponent/SearchOverlay/SearchOverlay.component';
import PropTypes from 'prop-types';
import Overlay from 'Component/Overlay';

import './SearchOverlay.style';

export default class SearchOverlay extends BaseSearchOverlay {
    static propTypes = {
        ...BaseSearchOverlay.propTypes,
        hideOverlay: PropTypes.bool
    };

    static defaultProps = {
        ...BaseSearchOverlay.defaultProps,
        hideOverlay: false
    };

    render() {
        const { hideOverlay } = this.props;

        if (hideOverlay) {
            return (
                <article
                    block="SearchOverlay"
                    elem="Results"
                    aria-label="Search results"
                >
                    { this.renderSearchResults() }
                </article>
            );
        }

        return (
            <Overlay
                id="search"
                mix={ { block: 'SearchOverlay' } }
            >
                { this.renderSearchCriteria() }
                <article
                    block="SearchOverlay"
                    elem="Results"
                    aria-label="Search results"
                >
                    { this.renderSearchResults() }
                </article>
            </Overlay>
        );
    }
}
