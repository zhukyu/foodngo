import React, { useEffect, useState } from 'react'
import Category from '../components/Category/Category'
import '../css/Restaurants.scss'
import RestaurantItem from '../components/RestaurantItem';
import Navbar from '../components/Navbar';
import axiosInstance from '../utility/AxiosInstance';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Footer from '../components/Footer';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin,Pagination, Skeleton, Space } from 'antd';


function Restaurants() {

    const [activeButtonIndex, setActiveButtonIndex] = useState(-1);
    const [restaurants, setRestaurants] = useState([]);
    const [pagination, setPagination] = useState({})
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchParams, setSearchParams] = useSearchParams();
    const skeleton =[1,2,3,4 ,5,6,7,8,9]
   
 

   

    const navigate = useNavigate()

    useEffect(() => {
        const address = localStorage.getItem('address');
        const coordinate = localStorage.getItem('coordinate');
        if (!address || !coordinate) {
            navigate('/');
        }
    }, [])


    useEffect(() => {
        const coordinateStr = localStorage.getItem('coordinate');
        const coordinate = JSON.parse(coordinateStr);
        console.log(searchParams.get("category"));
        const fetchData = async () => {
            const tmp = searchParams.get("category");
            setLoading(true);
            await axiosInstance.get(`/restaurant?longitude=${coordinate[0]}&latitude=${coordinate[1]}&page=${currentPage}&limit=9&category=${tmp ? tmp : ''}`)
                .then((res) => {
                    if (res.status === 200) {
                        setRestaurants(res.data.restaurants);
                        setPagination(res.data.pagination);
                        console.log(res.data.restaurants);
                    }
                })
            setLoading(false);
            
        }

        fetchData();
    }, [currentPage, searchParams])

    function handleClick(index) {
        if (index === activeButtonIndex) {
            // setActiveButtonIndex(-1);
            return;
        } else {
            setActiveButtonIndex(index);
        }
    }

    const antIcon = (
        <LoadingOutlined
            style={{
                fontSize: 40,
                color: "#FF003D",
                position: 'relative',
                marginTop: '40%',
                marginLeft: '60%'
            }}
            spin
        />
    );

    return (
        <div>
            
                <Navbar />
                <div className='Restaurants'>
                    <Category />
                    <div className='restaurants-section'>
                        {loading === false ? <h5>{pagination ? pagination.totalResult : 0} Results</h5> :<div className='skeleton_result'><Skeleton key={69} active loading={loading} title={false} paragraph={{
                                rows: 1,
                                width: 250,
                                
                            }}/></div>}
                        <div className='restaurants-list'>
                            
                            {loading === false ? restaurants.map((restaurant, id) => (
                                
                                <RestaurantItem
                                    key={id}
                                    img={restaurant.media[0].url}
                                    id={restaurant._id}
                                    name={restaurant.name}
                                    description={restaurant.description}
                                    rate={restaurant.rate}
                                    distance={restaurant.dist.calculated}
                                    deliveryTime={restaurant.deliveryTime}
                                />
                            )) : null}
                        </div>
                        <div className='skeleton_list'>
                            { loading ===true ? skeleton.map((item, index) => (<div className='skeleton_item'>
                            <Space size={12} direction='vertical'>
                            <Skeleton.Avatar active size={200} shape="square" loading={loading} />
                            <Skeleton key={index} active loading={loading} title={false} paragraph={{
                                rows: 3,
                                width: [250, 300, 150],
                                
                            }}/>
                            </Space>
                            </div>)): ""}
                        </div>
                        <Pagination current={currentPage} onChange={(e)=> {setCurrentPage(e)}} total={pagination.totalResult} style={{position:"relative", right:"-90%", marginTop:"6%"}}/>
                    </div>
                </div>
                <Footer />
            
        </div>
    )
}

export default Restaurants