import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext/AuthContext';
// import axios from 'axios';
import Loading from '../../components/Loading';
import ItemsRow from './ItemsRow';
//import { myItems } from '../../api/itemsApi';
import useTitle from '../../hooks/useTitle';
import useFoods from '../../api/useFoods';

const MyItems = () => {
    const { user } = useContext(AuthContext);
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const {myItemsPromise} = useFoods();
    useTitle("My Items")
     const fetchItems = async () => {
        try {
            setLoading(true);
            const data = await myItemsPromise(user.email); 
            setItems(data); 
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
        };

        useEffect(() => {
        if (user?.email) fetchItems(); 
        }, [user?.email]);


    if (loading) return <Loading />;

    return (
        <div className='mt-15 py-7 w-11/12 mx-auto space-y-4'>
            <h2 className='text-3xl font-semibold text-orange-400'>My Items</h2>
            <div className="overflow-x-auto ">
                <table className="table">
                    <thead>
                        <tr>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </th>
                            <th className='text-orange-400'>Food Name</th>
                            <th className='text-orange-400'>Category</th>
                            <th className='text-orange-400'>Quantity</th>
                            <th className='text-orange-400'>Expiry date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            items.map((item, index) => <ItemsRow key={item._id} item={item} index={index} onItemUpdated={() => fetchItems()}/>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyItems;
