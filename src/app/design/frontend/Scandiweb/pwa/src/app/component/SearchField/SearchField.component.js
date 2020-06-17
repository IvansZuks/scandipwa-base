/**
 * @category  Budo
 * @package   Budo_PWA
 * @author    Ivans Zuks <info@scandiweb.com>
 * @copyright Copyright (c) 2020 Scandiweb, Inc (https://scandiweb.com)
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 */

import { SearchField as BaseSearchField } from 'SourceComponent/SearchField/SearchField.component';
import isMobile from 'Util/Mobile';

import ClickOutside from 'Component/ClickOutside';
import SearchOverlay from 'Component/SearchOverlay';

import './SearchField.style';

class SearchField extends BaseSearchField {
    state = {
        isPlaceholderVisible: true,
        showSearch: false
    };

    onSearchEnterPress = (e) => {
        if (e.key === 'Enter') {
            const { searchCriteria, hideActiveOverlay, onSearchBarChange } = this.props;
            const search = searchCriteria.replace(/\s\s+/g, '%20');

            history.push(`/search/${ search }`);
            hideActiveOverlay();
            onSearchBarChange({ target: { value: '' } });
            this.searchBarRef.current.blur();
            this.closeSearch();
        }
    };

    openSearch = () => {
        const { onSearchBarFocus } = this.props;

        onSearchBarFocus();
        this.setState({ showSearch: true });
    };

    closeSearch = () => {
        const { onSearchOutsideClick } = this.props;

        onSearchOutsideClick();
        this.setState({ showSearch: false });
    };

    renderSearch() {
        const {
            searchCriteria,
            onSearchBarFocus,
            isActive
        } = this.props;

        return (
            <div
                block="SearchField"
                elem="SearchInnerWrapper"
            >
                <input
                    id="search-field"
                    ref={ this.searchBarRef }
                    block="SearchField"
                    elem="Input"
                    onFocus={ onSearchBarFocus }
                    onChange={ this.handleChange }
                    onKeyDown={ this.onSearchEnterPress }
                    value={ searchCriteria }
                    mods={ { isActive } }
                    autoComplete="off"
                />
                <div
                    block="SearchField"
                    elem="SearchIcon"
                    role="button"
                    tabIndex="0"
                    onClick={ () => this.searchBarRef.current.focus() }
                />
                <SearchOverlay
                    hideOverlay
                    clearSearch={ this.clearSearch }
                    searchCriteria={ searchCriteria }
                />
            </div>
        );
    }

    renderSearchIcon() {
        const { showSearch } = this.state;

        if (showSearch) {
            return (
                <div
                    block="SearchField"
                    elem="CloseIcon"
                    role="button"
                    tabIndex="0"
                    onClick={ this.closeSearch }
                />
            );
        }

        return (
            <div
                block="SearchField"
                elem="SearchIcon"
                role="button"
                tabIndex="0"
                onClick={ this.openSearch }
            />
        );
    }

    renderDesktopContent() {
        const { showSearch } = this.state;

        if (isMobile.any()) {
            return null;
        }

        return (
            <>
                { this.renderSearchIcon() }
                <div
                    block="SearchField"
                    elem="SearchWrapper"
                    mods={ { isVisible: showSearch } }
                >
                    { this.renderSearch() }
                </div>
            </>
        );
    }

    renderMobileContent() {
        const {
            searchCriteria,
            onSearchBarFocus,
            isActive
        } = this.props;

        if (!isMobile.any()) {
            return null;
        }

        const { isPlaceholderVisible } = this.state;

        return (
            <>
                <input
                    id="search-field"
                    ref={ this.searchBarRef }
                    block="SearchField"
                    elem="Input"
                    onFocus={ onSearchBarFocus }
                    onChange={ this.handleChange }
                    onKeyDown={ this.onSearchEnterPress }
                    value={ searchCriteria }
                    mods={ { isActive } }
                    autoComplete="off"
                />
                <div
                    block="SearchField"
                    elem="Placeholder"
                    mods={ {
                        isActive,
                        isPlaceholderVisible
                    } }
                >
                    <span>{ __('Search') }</span>
                </div>
                <SearchOverlay clearSearch={ this.clearSearch } searchCriteria={ searchCriteria } />
            </>
        );
    }

    render() {
        const {
            isVisible,
            isActive
        } = this.props;

        return (
            <div block="SearchField" mods={ { isVisible, isActive } }>
                <ClickOutside onClick={ this.closeSearch }>
                    <div block="SearchField" elem="Wrapper">
                        { this.renderMobileContent() }
                        { this.renderDesktopContent() }
                    </div>
                </ClickOutside>
            </div>
        );
    }
}

export default SearchField;
