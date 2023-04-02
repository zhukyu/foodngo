import React from 'react'
import '../../css/Category/Category.scss'
import Acclaimed from './CategoryItem/Acclaimed'
import Chicken from './CategoryItem/Chicken'
import FastFood from './CategoryItem/FastFood'
import Drinks from './CategoryItem/Drinks'
import Desserts from './CategoryItem/Desserts'
import Burgers from './CategoryItem/Burgers'
import Sandwiches from './CategoryItem/Sandwiches'
import Coffee from './CategoryItem/Coffee'
import Breakfast from './CategoryItem/Breakfast'
import Bakery from './CategoryItem/Bakery'
import Healthy from './CategoryItem/Healthy'
import Vegan from './CategoryItem/Vegan'
import Pizza from './CategoryItem/Pizza'

const categoryItems = [
    Acclaimed, Chicken, FastFood, Drinks, Desserts, Burgers, Sandwiches, Coffee, Breakfast, Bakery, Healthy, Vegan, Pizza
]

function Category() {
    return (
        <div className='Category'>          
            {categoryItems.map((CategoryItem, index) => {
                return <CategoryItem key={index} />
            })}
        </div>
    )
}

export default Category