import React,{useState, useEffect} from 'react';
import {StyleSheet, StatusBar, Button, FlatList, Text, View, TextInput, TouchableOpacity, Aleret, ToastAndroid, Alert} from 'react-native';

let originalData = [];

const Home = ({navigation}) => {
  const [myData, setMyData] = useState([]);
  const [totalPoints, setTotalPoints] = useState(0);

  const myurl = "https://ca2-sql.onrender.com/home"
  
  useEffect(()=>{
  fetch(myurl)
  .then((response)=>{
    return response.json();
  })
  .then((myJson)=>{
        setMyData(myJson);
        originalData=myJson;
        const sum = myJson.reduce(
          (total, item) => total + item.activity_points,
          0
        );
        setTotalPoints(sum);
  })},[]);
  

  const FilterData = (text) => {
    if(text!='') {
      let myFilteredData = originalData.filter((item) => 
        item.flavour.toLowerCase().includes(text.toLowerCase()));
      setMyData(myFilteredData);
    }
    else {
      setMyData(originalData);
    }
  }

  const getTier = () => {
    let tier = "Bronze Tier 🍂";
    if (totalPoints >= 500) tier = "Platinum Tier 🌲";
    else if (totalPoints >= 300) tier = "Gold Tier 🌿";
    else if (totalPoints >= 100) tier = "Silver Tier 🍃";
    Alert.alert(tier);
  };

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity 
      onPress={()=>{
        navigation.navigate("Edit",{id:item.event_id, name:item.action, category:item.category, points:item.points})
        }
      }>
      <View style={{flexDirection:"row", alignItems:"center",borderWidth:1}}>
      <View style={{flex:1}}><Text style={styles.scol1}>{item.action}</Text></View>
      <View style={{flex:1}}><Text style={styles.scol2}>{item.category}</Text></View>
      <View style={{flex:1}}><Text style={styles.scol3}>{item.points}</Text></View>
      </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flex:1}}>
      <StatusBar hidden={true}/>
      <View style={styles.header}>
        <Text style={[styles.header2,{fontSize: 30}]}>SG Green Plan</Text>
        <View style={{flexDirection:"column", alignItems:"center"}}>
          <Text style={styles.header2}>{totalPoints} pts</Text>
          <TouchableOpacity  onPress={getTier}>
            <Text style={styles.tierbtn}>VIEW TIER</Text>
          </TouchableOpacity>
        </View>
        
      </View>
      <Text style={{fontWeight:"bold"}}>Search:</Text>
      <TextInput style={styles.search} onChangeText={(text)=>{FilterData(text)}}/>
      <Button title='Add Activity' onPress={()=>{navigation.navigate("Add")}} color="#065729"/>
      <Text> </Text>  
      <View style={styles.row}>
        <Text style={styles.col1}>Activity</Text>
        <Text style={styles.col2}>Category</Text>
        <Text style={styles.col3}>Points</Text>
      </View>
      
      <FlatList data={myData} renderItem={renderItem} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    padding: 15
  },
  header2: {
    fontWeight: 'bold',
    paddingVertical: 8
  },
  search: {
    borderWidth: 1,
    margin: 10
  },
  row: {
    flexDirection: 'row',
    borderWidth: 1,
    paddingVertical: 10
  },
  col1: {
    flex: 2,
    fontWeight: 'bold',
    paddingLeft: 5
  },
  col2: {
    fontWeight: 'bold',
    flex: 1
  },
  col3: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  scol1: {
    flex: 2,
    paddingLeft: 5
  },
  scol2: {
    flex: 1
  },
  scol3: {
    flex: 1,
    textAlign: 'center'
  },
  tierbtn: {
    padding: 3,
    color: 'white',
    fontWeight: 'bold',
    backgroundColor: '#268416',
    fontSize:10
  },
});

export default Home;
