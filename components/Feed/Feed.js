import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";

import { Post } from "../Post";
import ViewPager from "../ViewPager";

function Feed({ navigation }) {
  const renderItem = ({ item }) => {
    return <Post key={item.id} {...item} navigation={navigation} />;
  };

  const keyExtractor = (item) => item.id;

  return (
    <View style={styles.container}>
      <ViewPager
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        style={styles.flatList}
        size={height}
        horizontal={false}
        snapToInterval={height}
        snapToAlignment="end"
      />
    </View>
  );
}

const data = [
  {
    id: "1",
    url:
      "https://instagram.flis5-1.fna.fbcdn.net/v/t51.2885-15/e35/126262187_1326293687703367_4717367315447571707_n.jpg?_nc_ht=instagram.flis5-1.fna.fbcdn.net&_nc_cat=107&_nc_ohc=U_d2_YjLZfAAX-m8_K3&tp=1&oh=7e388f244c8156f9ba059ff2dd73f737&oe=6042F76D",
    description: "This is a very short description of this video I just posted",
    author: {
      username: "JaneFisher",
      imageUrl: "",
    },
    externalLink: "example.com",
    views: "306",
    likes: "189",
    shares: "22",
    answer: "1",
  },
  {
    id: "2",
    url:
      "https://instagram.flis5-1.fna.fbcdn.net/v/t50.2886-16/126888578_378596023561203_3448226840820167123_n.mp4?_nc_ht=instagram.flis5-1.fna.fbcdn.net&_nc_cat=103&_nc_ohc=UKyFzd2USFEAX8gUXWH&oe=5FC86C91&oh=0cd0a03647a5977d9c190c6a150213a0",
    description: "Secret beach “La Playa del Amor” in Islas Marietas, Mexico",
    author: {
      username: "PadiTV",
      imageUrl:
        "https://instagram.flis5-1.fna.fbcdn.net/v/t51.2885-19/42173854_2004594479830850_5521340897511342080_n.jpg?_nc_ht=instagram.flis5-1.fna.fbcdn.net&_nc_ohc=e-uZ4TTGChAAX-16veF&oh=21d36be74996a9a030b1b9270c433d83&oe=5FEF2C62",
    },
    externalLink: "example.com",
    views: "200",
    likes: "81",
    shares: "12",
    answer: "5",
  },
  {
    id: "3",
    url:
      "https://instagram.flis5-1.fna.fbcdn.net/v/t50.2886-16/125869848_185885116450220_5010921192452842805_n.mp4?_nc_ht=instagram.flis5-1.fna.fbcdn.net&_nc_cat=108&_nc_ohc=Vd4n_C7i62kAX-3rgtq&oe=5FC8BC91&oh=a4657441aa561aed653ef945872e27c0",
    description: "This was CLEAN",
    author: {
      username: "SportsCenter",
      imageUrl:
        "https://instagram.flis5-1.fna.fbcdn.net/v/t51.2885-19/s150x150/44681398_2171288513142976_2550353929711910912_n.jpg?_nc_ht=instagram.flis5-1.fna.fbcdn.net&_nc_ohc=bIoyLntCkxAAX-He8sz&tp=1&oh=efb2a011c3f0b028366c633609f4d148&oe=5FEF76C8",
    },
    externalLink: "example.com",
    views: "404",
    likes: "121",
    shares: "21",
    answer: "26",
  },
  {
    id: "4",
    url:
      "https://instagram.flis5-1.fna.fbcdn.net/v/t50.2886-16/127199917_913327152530243_4641490979170110651_n.mp4?_nc_ht=instagram.flis5-1.fna.fbcdn.net&_nc_cat=111&_nc_ohc=KVNILaZP4YgAX8v_36O&oe=5FC86BE2&oh=ae4c6440cbcedcad60c3f145adc86239",
    description: "Persistance is key",
    author: {
      username: "XGames",
      imageUrl:
        "https://instagram.flis5-1.fna.fbcdn.net/v/t51.2885-19/s150x150/108730147_953590338443287_8324159938009935733_n.jpg?_nc_ht=instagram.flis5-1.fna.fbcdn.net&_nc_ohc=0UuH3g6TdKgAX8VQMT2&tp=1&oh=715ccfc719d706b9e5a1321aad3b1a5d&oe=5FEFEEC8",
    },
    externalLink: "example.com",
    views: "404",
    likes: "121",
    shares: "21",
    answer: "26",
  },
  {
    id: "5",
    url:
      "https://instagram.flis5-1.fna.fbcdn.net/v/t50.2886-16/125505221_195609342034245_3388236763194820638_n.mp4?_nc_ht=instagram.flis5-1.fna.fbcdn.net&_nc_cat=109&_nc_ohc=LaDTAsF_DIEAX91n5ft&oe=5FC8949C&oh=8433aae9890375a055a430a011cc1957",
    description: "I can be a ball boy too",
    author: {
      username: "MaxDog",
      imageUrl:
        "https://instagram.flis5-1.fna.fbcdn.net/v/t51.2885-19/s150x150/106187871_210011660187820_6326930798585199888_n.jpg?_nc_ht=instagram.flis5-1.fna.fbcdn.net&_nc_ohc=7Vo5DFFnoBQAX9njlGm&tp=1&oh=93b7c026123efb35636da920bb52dd02&oe=5FEE54E6",
    },
    externalLink: "example.com",
    views: "404",
    likes: "121",
    shares: "21",
    answer: "26",
  },
  {
    id: "6",
    url:
      "https://instagram.flis5-1.fna.fbcdn.net/v/t50.2886-16/127939334_198393301814256_8921741831673252662_n.mp4?_nc_ht=instagram.flis5-1.fna.fbcdn.net&_nc_cat=100&_nc_ohc=LLbJ2DE5IRMAX8HAX9g&oe=5FC8F656&oh=d429e7aa3827e84459ac4f6a78f9a5a3",
    description:
      "Free diving in crystal clear water at the only place on Earth where you can touch both the North American and the Eurasian Continental Plate at the same time! Location: Silfra, Iceland",
    author: {
      username: "OceanExplorer",
      imageUrl:
        "https://instagram.flis5-1.fna.fbcdn.net/v/t51.2885-19/s150x150/82568108_604265420371942_5650349822318739456_n.jpg?_nc_ht=instagram.flis5-1.fna.fbcdn.net&_nc_ohc=5SorX8iHJlAAX9m5N1e&tp=1&oh=bde8bd3321f370fb036c8372faab32e8&oe=5FF06B92",
    },
    externalLink: "example.com",
    views: "404",
    likes: "121",
    shares: "21",
    answer: "26",
  },
  {
    id: "7",
    url:
      "https://instagram.flis5-1.fna.fbcdn.net/v/t50.2886-16/125549710_713340066274556_5872930227307495258_n.mp4?_nc_ht=instagram.flis5-1.fna.fbcdn.net&_nc_cat=108&_nc_ohc=5eC5hEO_LZYAX8ik57V&oe=5FC8AC55&oh=311b4a96543ed3c28d37498826b40be5",
    description: "Me at the Olympics",
    author: {
      username: "JumpingJack",
      imageUrl:
        "https://instagram.flis5-1.fna.fbcdn.net/v/t51.2885-19/s150x150/122403260_816318832475631_6920856436795025895_n.jpg?_nc_ht=instagram.flis5-1.fna.fbcdn.net&_nc_ohc=AplnQEL0dhwAX-7QEOD&tp=1&oh=87c877541b3a744077191322aa4c8b41&oe=5FF0F413",
    },
    externalLink: "example.com",
    views: "404",
    likes: "121",
    shares: "21",
    answer: "26",
  },
  {
    id: "8",
    url:
      "https://instagram.flis5-1.fna.fbcdn.net/v/t50.2886-16/126435293_306716230400845_5494035644464095985_n.mp4?_nc_ht=instagram.flis5-1.fna.fbcdn.net&_nc_cat=101&_nc_ohc=Bti1NjEUTZwAX_z-kqi&oe=5FC88A1F&oh=1575d32435cde6b7c5e551df62858df6",
    description: "Who’d love to meet this beautiful waving bear? 😍🐻",
    author: {
      username: "TheExplorer",
      imageUrl:
        "https://instagram.flis5-1.fna.fbcdn.net/v/t51.2885-19/s150x150/96750331_627666348094013_8303191644627271680_n.jpg?_nc_ht=instagram.flis5-1.fna.fbcdn.net&_nc_ohc=hwIbmUcqxpEAX_ehAnZ&tp=1&oh=caf13be29f8b0f3a4f5c7f4b9eb53f60&oe=5FEE5A9F",
    },
    externalLink: "example.com",
    views: "404",
    likes: "121",
    shares: "21",
    answer: "26",
  },
];

const { height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatList: {
    flex: 1,
  },
});

export default Feed;
