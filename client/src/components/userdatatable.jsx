export default function UserDataTable(props) {
    return (
        <div className="container">
            <div className="row">
                <div className="col-1 is-vertical-align">
                    <select className="inline" defaultValue="5">
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
                    <input className="col-3" placeholder="Search ..." defaultValue="" />
                </div>
            </div>
            <table id="usertable" className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Address</th>
                    </tr>
                </thead>
                <tbody>
                    {props.data.map((item, index) => (
                        <tr key={index}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item.address}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
