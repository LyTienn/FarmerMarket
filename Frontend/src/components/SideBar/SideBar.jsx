import {React, useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SideBar.css';
import categoryicon from '../../assets/category_icon.svg';

// /**
//  * @param {Object} props
//  * @param {'vegetable'|'fruit'|'rice'|'spice'|'meat'
//  * | 'seafood' | 'milk' | 'traditionfood' | 'tea' | 'sale'} props.selectedCategory
//  */

const SideBar = ( {selectedCategory, setSelectedCategory} ) => {
    const navigate = useNavigate();

    return (
        <div className='sidebar-container'>
            <div className='sidebar-title'>
                <img src={categoryicon} alt='Category Icon' className='sidebar-icon'/>
                <span>Tất cả danh mục</span>
            </div>
            <hr/>
            <div className='sidebar-list'>
                <button className={`vegetable-sb${selectedCategory === 'vegetable' ? ' active' : ''}`}
                onClick={() => setSelectedCategory('vegetable')}
                >Rau củ</button><br/> 
                <button className={`fruit-sb${selectedCategory === 'fruit' ? ' active' : ''}`}
                onClick={() => setSelectedCategory('fruit')}
                >Hoa quả</button><br/>
                <button className={`rice-sb${selectedCategory === 'rice' ? ' active' : ''}`}
                onClick={() => setSelectedCategory('rice')}
                >Gạo</button><br/>
                <button className={`spice-sb${selectedCategory === 'spice' ? ' active' : ''}`}
                onClick={() => setSelectedCategory('spice')}
                >Gia vị</button><br/>
                <button className={`meat-sb${selectedCategory === 'meat' ? ' active' : ''}`}
                onClick={() => setSelectedCategory('meat')}
                >Thịt</button><br/>
                <button className={`seafood-sb${selectedCategory === 'seafood' ? ' active' : ''}`}
                onClick={() => setSelectedCategory('seafood')}
                >Hải sản</button><br/>
                <button className={`milk-sb${selectedCategory === 'milk' ? ' active' : ''}`}
                onClick={() => setSelectedCategory('milk')}
                >Sữa</button><br/>
                <button className={`traditionfood-sb${selectedCategory === 'traditionfood' ? ' active' : ''}`}
                onClick={() => setSelectedCategory('traditionfood')}
                >Đặc sản vùng miền</button><br/>
                <button className={`tea-sb${selectedCategory === 'tea' ? ' active' : ''}`}
                onClick={() => setSelectedCategory('tea')}
                >Trà</button><br/>
                <button className={`sale-sb${selectedCategory === 'sale' ? ' active' : ''}`}
                onClick={() => setSelectedCategory('sale')}
                >Khuyến mãi</button><br/>
                <button className={`all-sb${selectedCategory === 'all' ? 'active' : ''}`}
                onClick={() => setSelectedCategory('all')}
                >Tất cả</button>
            </div>
        </div>
    )
}

export default SideBar;