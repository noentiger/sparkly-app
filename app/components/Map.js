/* @flow */

import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
} from 'react-native';
import MapView from 'react-native-maps';
import { observer } from 'mobx-react/native';
import Stall from 'stores/Stall';
import StallService from 'services/Stall';
import MyPositionButton from 'components/MyPositionButton';
import SparkCard from 'components/SparkCard';
import SparkEdit from 'components/SparkEdit';
import SearchPlace from 'components/SearchPlace';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

@observer
class Map extends Component {
  constructor(props) {
    super(props);

    this.state = {
      region: new MapView.AnimatedRegion({
        latitude: null,
        longitude: null,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      }),
      modalVisible: false,
      editMode: props.editMode,
      searchText: props.editMode ? 'Find your address' : 'Find a Spark',
    };
  }

  componentWillMount() {
    Stall.getAll();
  }

  componentDidMount() {
    this.getCurrentPosition();
  }

  getCurrentPosition() {
    navigator.geolocation.getCurrentPosition(
        (position) => {
          const { coords } = position;
          this.setState(
            {
              region: new MapView.AnimatedRegion({
                latitude: coords.latitude,
                longitude: coords.longitude,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
              }),
            }
          );
        },
        error => console.error('err', error),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
      );
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  saveSpark() {
    StallService.create().then(() => {
      this.setModalVisible(false);
    }).catch((err) => {
      console.error(err);
    });
  }

  onRegionChange(region) {
    this.state.region.setValue(region);
  }

  _handlePlace(place) {
    this.setState({
      region: new MapView.AnimatedRegion({
        latitude: place.latitude,
        longitude: place.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      }),
    });

    if (this.state.editMode) {
      StallService.data.address = place.address;
      StallService.data.lat = place.latitude;
      StallService.data.lng = place.longitude;
      this.setModalVisible(true);
    }
  }

  render() {
    const { stalls } = Stall;
    const { region, modalVisible, searchText } = this.state;
    const { address, ends_at } = StallService.data;

    const markers = [];
    for (let i = 0; i < stalls.length; i++) {
      const marker = {
        coordinate: stalls[i].coordinate,
        key: stalls[i].id.toString(),
        address: stalls[i].address,
        id: stalls[i].id,
        reserved: stalls[i].reserved,
      };
      markers.push(marker);
    }

    return (
      <View style={mainStyles.container}>
        <MapView.Animated
          provider={this.props.provider}
          style={mainStyles.map}
          initialRegion={region}
          region={region}
          onRegionChange={this.onRegionChange.bind(this)}
        >
          {markers.map(marker => (
            <MapView.Marker
              title={marker.key}
              key={marker.key}
              coordinate={marker.coordinate}
            >
              <MapView.Callout style={{ width: 150, height: 150 }}>
                <SparkCard store={Stall} {...marker} />
              </MapView.Callout>
            </MapView.Marker>
          ))}
        </MapView.Animated>

        <SparkEdit
          visible={modalVisible}
          address={address}
          ends_at={ends_at}
          onSave={() => this.setModalVisible(false)}
          onCancel={() => this.setModalVisible(false)}
        />

        <SearchPlace placeholder={searchText} onGetPlace={place => this._handlePlace(place)} />
        <MyPositionButton onPress={() => this.getCurrentPosition()} />
      </View>
    );
  }
}

Map.propTypes = {
  provider: MapView.ProviderPropType,
  editMode: PropTypes.bool,
};

const mainStyles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default Map;
