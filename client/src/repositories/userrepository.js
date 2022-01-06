const UserRepository = (function () {
    /*
     * private members
     */
    const urls = {
        UserList: 'https://random-data-api.com/api/users/random_user?size=10',
    };

    /*
     * public members
     */
    class UserRepository {
        fetchAllUsers() {
            return window
                .fetch(urls.UserList)
                .then((response) => response.json())
                .then((json) => {
                    return json.map((user) => ({
                        id: user.id,
                        name: user.username,
                        email: user.email,
                        address: user.address.street_address,
                    }));
                });
        }
    }
    return UserRepository;
})();

export default new UserRepository();
