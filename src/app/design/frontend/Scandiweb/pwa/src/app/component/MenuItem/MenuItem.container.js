/**
 * @category  Budo
 * @package   Budo_PWA
 * @author    Ivans Zuks <info@scandiweb.com>
 * @copyright Copyright (c) 2020 Scandiweb, Inc (https://scandiweb.com)
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 */

import { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import MenuItem from './MenuItem.component';

export class MenuItemContainer extends PureComponent {
    static propTypes = {
        onCategoryHover: PropTypes.func,
        item: PropTypes.object.isRequired
    };

    static defaultProps = {
        onCategoryHover: () => {}
    };

    containerFunctions = {
        handleCategoryHover: this.handleCategoryHover.bind(this)
    };

    handleCategoryHover() {
        const { onCategoryHover, item } = this.props;

        onCategoryHover(item);
    }

    render() {
        return (
            <MenuItem
                { ...this.props }
                { ...this.containerFunctions }
            />
        );
    }
}

export default connect(null)(MenuItemContainer);
