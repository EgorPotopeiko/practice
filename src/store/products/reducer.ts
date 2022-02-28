import { Reducer } from 'redux';
const initialState = {
    products: [
        {
            "id": "c0509297-7fe8-44c4-a6c1-7b5a22000be7",
            "title": "in imperdiet et commodo vulputate justo in",
            "description": "auctor sed tristique in tempus sit amet sem fusce consequat nulla nisl nunc nisl duis bibendum felis sed interdum venenatis turpis enim blandit mi in porttitor pede justo eu massa donec dapibus duis at velit eu est congue elementum in hac habitasse platea dictumst morbi vestibulum velit id pretium iaculis diam erat fermentum justo nec condimentum neque sapien placerat ante nulla justo aliquam quis turpis eget elit sodales scelerisque mauris sit amet eros suspendisse accumsan tortor quis turpis sed ante vivamus tortor duis mattis egestas metus aenean fermentum donec ut mauris eget massa tempor convallis nulla neque libero convallis eget eleifend luctus ultricies eu nibh quisque id justo sit amet sapien dignissim vestibulum vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae nulla dapibus dolor vel est donec odio justo sollicitudin ut suscipit a feugiat et eros vestibulum ac est lacinia nisi venenatis tristique fusce congue diam",
            "cost": 60,
            "available": true,
            "added_date": "7/15/2017",
            "maker": "Purina",
            "category": "fishes",
            "subcategory": "Корма"
        },
        {
            "id": "97155bc7-80a5-48e8-b5e6-e26ef5f9b679",
            "title": "adipiscing lorem vitae mattis nibh ligula",
            "description": "quam pede lobortis ligula sit amet eleifend pede libero quis orci nullam molestie nibh in lectus pellentesque at nulla suspendisse potenti cras in purus eu magna vulputate luctus cum sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus mus vivamus vestibulum sagittis sapien cum sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus mus etiam vel augue vestibulum rutrum rutrum neque aenean auctor gravida sem praesent id massa id nisl venenatis lacinia aenean sit amet justo morbi ut odio cras mi pede malesuada in imperdiet et commodo vulputate justo in blandit ultrices enim",
            "cost": 86,
            "available": true,
            "added_date": "3/13/2018",
            "maker": "Fisherman",
            "category": "birds",
            "subcategory": "Клетки"
        },
        {
            "id": "421c23f2-3267-414c-8e32-b13e22cb73d0",
            "title": "pede libero quis orci",
            "description": "duis faucibus accumsan odio curabitur convallis duis consequat dui nec nisi volutpat eleifend donec ut dolor morbi vel lectus in quam fringilla rhoncus mauris enim leo rhoncus sed vestibulum sit amet cursus id turpis integer aliquet massa id lobortis convallis tortor risus dapibus augue vel accumsan tellus nisi eu orci mauris lacinia sapien quis libero nullam sit amet turpis elementum ligula vehicula consequat morbi a ipsum integer a nibh in quis justo maecenas rhoncus aliquam lacus morbi quis tortor id nulla ultrices aliquet maecenas leo odio condimentum id luctus",
            "cost": 100,
            "available": false,
            "added_date": "7/29/2017",
            "maker": "ZooParadise",
            "category": "fishes",
            "subcategory": "Корма"
        },
        {
            "id": "674e3a8d-bc42-4a75-a88a-f2525dd825e0",
            "title": "ultrices aliquet maecenas leo",
            "description": "luctus et ultrices posuere cubilia curae nulla dapibus dolor vel est donec odio justo sollicitudin ut suscipit a feugiat et eros vestibulum ac est lacinia nisi venenatis tristique fusce congue diam id ornare imperdiet sapien urna pretium nisl ut volutpat sapien arcu sed augue aliquam erat volutpat in congue etiam justo etiam pretium iaculis justo in hac habitasse platea dictumst etiam faucibus cursus urna ut tellus nulla ut erat id mauris vulputate elementum nullam varius nulla facilisi cras non velit nec nisi vulputate nonummy maecenas tincidunt lacus at velit vivamus vel nulla eget eros elementum pellentesque quisque porta volutpat erat quisque erat eros viverra eget congue eget semper rutrum nulla nunc purus phasellus in felis donec semper sapien a libero nam dui proin leo odio porttitor id consequat in consequat ut nulla",
            "cost": 68,
            "available": false,
            "added_date": "9/3/2017",
            "maker": "ZooParadise",
            "category": "birds",
            "subcategory": "Лакомтса"
        },
        {
            "id": "becbb856-4785-44a9-8ea0-0161e9198b7c",
            "title": "justo sit amet sapien dignissim vestibulum vestibulum",
            "description": "metus aenean fermentum donec ut mauris eget massa tempor convallis nulla neque libero convallis eget eleifend luctus ultricies eu nibh quisque id justo sit amet sapien dignissim vestibulum vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae nulla dapibus dolor vel est donec odio justo sollicitudin ut suscipit a feugiat et eros vestibulum ac est lacinia nisi venenatis tristique fusce congue diam id ornare imperdiet sapien urna pretium nisl ut volutpat sapien arcu sed augue aliquam erat volutpat in congue etiam justo etiam pretium iaculis justo in hac habitasse platea dictumst etiam faucibus cursus urna ut tellus nulla ut erat id mauris vulputate elementum nullam varius nulla facilisi cras non velit nec nisi vulputate nonummy maecenas tincidunt lacus at velit vivamus vel nulla eget eros elementum pellentesque quisque porta volutpat erat quisque erat eros viverra eget congue eget semper rutrum nulla nunc purus phasellus in felis donec semper sapien a libero nam dui proin leo odio porttitor id consequat in consequat ut nulla sed accumsan felis ut at dolor quis odio consequat varius integer ac leo pellentesque ultrices mattis odio donec vitae nisi nam",
            "cost": 40,
            "available": false,
            "added_date": "7/19/2018",
            "maker": "Purina",
            "category": "birds",
            "subcategory": "Средства по уходу"
        },
        {
            "id": "43ca2098-0fdc-48f5-a062-79a40ae30dd0",
            "title": "interdum mauris non ligula pellentesque ultrices",
            "description": "in porttitor pede justo eu massa donec dapibus duis at velit eu est congue elementum in hac habitasse platea dictumst morbi vestibulum velit id pretium iaculis diam erat fermentum justo nec condimentum neque sapien placerat ante nulla justo aliquam quis turpis eget elit sodales scelerisque mauris sit amet eros suspendisse accumsan tortor quis turpis sed ante vivamus tortor duis mattis egestas metus aenean fermentum donec ut mauris eget massa tempor convallis nulla neque libero convallis eget eleifend luctus ultricies eu nibh quisque id justo sit amet sapien dignissim vestibulum vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae nulla dapibus dolor vel est donec odio justo sollicitudin ut suscipit a feugiat et eros vestibulum ac est lacinia nisi venenatis tristique fusce congue diam id ornare imperdiet sapien urna pretium nisl ut volutpat sapien arcu sed augue aliquam erat volutpat in congue etiam justo etiam pretium iaculis justo in hac habitasse platea dictumst etiam faucibus cursus urna ut tellus nulla ut erat id mauris vulputate elementum nullam varius nulla facilisi cras non velit nec nisi vulputate nonummy maecenas tincidunt lacus at velit",
            "cost": 51,
            "available": true,
            "added_date": "7/15/2018",
            "maker": "Fisherman",
            "category": "rodents",
            "subcategory": "Средства по уходу"
        },
        {
            "id": "953f2ffe-5c00-4b76-b57e-f50e280d6ca7",
            "title": "nulla mollis molestie",
            "description": "vel accumsan tellus nisi eu orci mauris lacinia sapien quis libero nullam sit amet turpis elementum ligula vehicula consequat morbi a ipsum integer a nibh in quis justo maecenas rhoncus aliquam lacus morbi quis tortor id nulla ultrices aliquet maecenas leo odio condimentum id luctus nec molestie sed justo pellentesque viverra pede ac diam cras pellentesque volutpat dui maecenas tristique est et tempus semper est quam pharetra magna ac consequat metus sapien ut nunc vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae mauris viverra diam vitae quam suspendisse potenti nullam porttitor lacus at turpis donec posuere metus vitae ipsum aliquam non mauris morbi non lectus aliquam sit amet diam in magna bibendum imperdiet nullam orci pede venenatis non sodales sed tincidunt eu felis fusce posuere felis sed lacus morbi sem mauris laoreet ut rhoncus aliquet pulvinar sed nisl nunc rhoncus dui vel sem sed sagittis nam congue risus semper porta volutpat quam pede lobortis ligula sit amet eleifend pede libero quis orci nullam molestie nibh",
            "cost": 25,
            "available": true,
            "added_date": "7/2/2017",
            "maker": "Рога и копыта",
            "category": "rodents",
            "subcategory": "Сухой корм"
        },
        {
            "id": "cf3ec389-bffe-41dc-8ac9-ece68abb6187",
            "title": "donec vitae nisi nam ultrices libero non",
            "description": "a feugiat et eros vestibulum ac est lacinia nisi venenatis tristique fusce congue diam id ornare imperdiet sapien urna pretium nisl ut volutpat sapien arcu sed augue aliquam erat volutpat in congue etiam justo etiam pretium iaculis justo in hac habitasse platea dictumst etiam faucibus cursus urna ut tellus nulla ut erat id mauris vulputate elementum nullam varius nulla facilisi cras non velit nec nisi vulputate nonummy maecenas tincidunt lacus at velit vivamus vel nulla eget eros elementum pellentesque quisque porta volutpat erat quisque erat eros viverra eget congue eget semper rutrum nulla nunc purus phasellus in felis donec semper sapien a libero nam dui proin leo odio porttitor id consequat",
            "cost": 2,
            "available": true,
            "added_date": "9/18/2017",
            "maker": "ZooParadise",
            "category": "cats",
            "subcategory": "Сухие корма"
        },
        {
            "id": "a7ee1603-1a54-4701-9196-46fa5f3d544a",
            "title": "aenean sit amet justo morbi ut odio",
            "description": "ac est lacinia nisi venenatis tristique fusce congue diam id ornare imperdiet sapien urna pretium nisl ut volutpat sapien arcu sed augue aliquam erat volutpat in congue etiam justo etiam pretium iaculis justo in hac habitasse platea dictumst etiam faucibus cursus urna ut tellus nulla ut erat id mauris vulputate elementum nullam varius nulla facilisi cras non velit nec nisi vulputate nonummy maecenas tincidunt lacus at velit vivamus vel nulla eget eros elementum pellentesque quisque porta volutpat erat quisque erat eros viverra eget congue eget semper rutrum nulla nunc purus phasellus in felis donec semper sapien a libero nam dui proin leo odio porttitor id consequat in consequat ut nulla sed accumsan felis ut at dolor quis odio consequat varius integer ac leo",
            "cost": 74,
            "available": true,
            "added_date": "7/22/2017",
            "maker": "Дружок",
            "category": "birds",
            "subcategory": "Лакомтса"
        },
    ]
};

const productsReducer: Reducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_PRODUCTS":
            return {
                ...state,
                products: action.products
            }
        default:
            return state;
    }
}

export default productsReducer