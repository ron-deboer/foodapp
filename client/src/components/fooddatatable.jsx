import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import _ from 'lodash';

export default function FoodDataTable(props) {
    let navigate = useNavigate();
    const initialConfig = {
        rowsperpage: 20,
        pagenum: 1,
        filter: '',
    };
    const [data, setData] = useState(props.data);
    const [config, setConfig] = useState(initialConfig);
    const [filter, setFilter] = useState('');

    useEffect(() => {
        setData(props.data);
    }, [props]);

    const pageNav = (direction) => {
        let cfg = _.assign({}, config);
        if (direction === 'next') {
            cfg.pagenum++;
        } else if (direction === 'prev') {
            cfg.pagenum--;
        }
        loadPageData();
    };

    const rowsPerPage = (lines) => {
        let cfg = { ...config, rowsperpage: lines };
        loadPageData();
    };

    const loadPageData = () => {
        let newcfg = _.assign({}, config);
        const pgstart = (newcfg.pagenum - 1) * newcfg.rowsperpage;
        const pgend = pgstart + newcfg.rowsperpage;
        if (filter === '') {
            setData(props.data.slice(pgstart, pgend));
        }
        setConfig(newcfg);
    };

    const filterData = (str) => {
        setFilter(str);
        const filtered = props.data.filter(function (o) {
            return _.some(o, function (v) {
                return _.toLower(v).indexOf(str) > -1;
            });
        });
        let cfg = Object.assign({}, config);
        cfg.pagenum = 1;
        setData(filtered);
        setConfig(cfg);
        loadPageData();
    };

    const editRow = (food) => {
        navigate('/addfood/' + food.id);
    };

    const removeRow = (food) => {
        navigate('/removefood/' + food.id);
    };

    return (
        <div className="container table-container">
            <div className="row">
                <div className="col-1 is-vertical-align">
                    <select
                        className="inline"
                        defaultValue="20"
                        onChange={(ev) => rowsPerPage(ev.target.value)}
                    >
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                        <option value="20">20</option>
                        <option value="25">25</option>
                    </select>
                </div>
                <div className="col-2 is-vertical-align">
                    <label>entries per page</label>
                </div>
                <div className="col-9 is-right">
                    <input
                        className="col-3"
                        placeholder="Filter ..."
                        value={filter}
                        onChange={(ev) => filterData(ev.target.value)}
                    />
                </div>
            </div>
            <table id="usertable" className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>Category</th>
                        <th>Name</th>
                        <th>Calories per 100g</th>
                        <th>Carbs per 100g</th>
                        <th>&nbsp;</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td>{item.category}</td>
                            <td>{item.name}</td>
                            <td>{item.calories}</td>
                            <td>{item.carbs}</td>
                            <td style={{ textAlign: 'center' }}>
                                <div
                                    className="tag bg-primary text-white is-small"
                                    onClick={() => editRow(item)}
                                >
                                    Edit
                                </div>
                            </td>
                            <td style={{ textAlign: 'center' }}>
                                <div
                                    className="tag bg-warning text-white is-small"
                                    onClick={() => removeRow(item)}
                                >
                                    X
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="row is-full-width is-right pagination">
                <div className="col-1 pagenav is-right" onClick={() => pageNav('prev')}>
                    {' '}
                    &#9664;{' '}
                </div>
                <div className="col-1"> PAGE : {config.pagenum} </div>
                <div className="col-1 pagenav is-left" onClick={() => pageNav('next')}>
                    {' '}
                    &#9654;{' '}
                </div>
            </div>
        </div>
    );
}
