import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectDirectorySections } from '../../redux/directory/directory.selectors';

import './directory.styles.scss';

import MenuItem from '../menu-item/menu-item.component';

const Directory = ( { sections } ) => (
            <div className='directory-menu'>
                {
                    sections.map( ( { title, imageUrl, id, size, linkUrl } ) => (
                        <MenuItem key={id} title={title} imageUrl={imageUrl} size={size} linkUrl={linkUrl} />
                    ) )

                    // We can also write like this way:-
                    //  this.state.sections.map( ( {id, ...otherSectionProps } ) => (
                    //    <MenuItem key={id} {...otherSectionProps} />
                    // ) )
                }
            </div>
);

const mapStateToProps = createStructuredSelector({
    sections: selectDirectorySections
});

export default connect(mapStateToProps)(Directory);