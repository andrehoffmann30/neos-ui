import React, {Component, PropTypes} from 'react';
import mergeClassNames from 'classnames';
import {service} from '../../../Shared/';
import style from './style.css';
import iconStyles from './icons.css';
import {
  ICON_NAMES,
  DEPRECATED_ICON_NAMES
} from './IconNames.js';
const {logger} = service;

export default class Icon extends Component {
    static propTypes = {
        size: PropTypes.oneOf(['big', 'regular', 'small', 'tiny']).isRequired,
        icon(props, propName) {
            const val = props[propName];

            if (DEPRECATED_ICON_NAMES.indexOf(val) > -1) {
                logger.warn(`Font-Awesome has been updated. The icon name "${val}" has been updated/removed. Please adjust your icon configurations in your .yaml files to the new name-scheme of Font-Awesome 4.5.`);
            } else if (ICON_NAMES.indexOf(val) === -1) {
                return new Error(`Icon name "${val}" is not a valid icon name in Font-Awesome 4.5. Please use the icon names from http://fortawesome.github.io/Font-Awesome/icons/.`);
            }
        }
    }

    render() {
        const {size} = this.props;
        const iconClassName = this.getIconClassName();
        const classNames = mergeClassNames({
            [style.icon]: true,
            [iconClassName]: true,
            [style.big]: size === 'big',
            [style.small]: size === 'small',
            [style.tiny]: size === 'tiny'
        });

        return (
            <i className={classNames}></i>
        );
    }

    getIconClassName() {
        const {icon} = this.props;
        let className = iconStyles[icon];

        if (!className) {
            const iconName = icon.replace('icon-', 'fa-');

            className = iconStyles[iconName];
        }

        return className;
    }
}
Icon.defaultProps = {
    size: 'regular'
};
