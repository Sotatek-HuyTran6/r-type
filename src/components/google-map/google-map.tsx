import React, { useEffect, useCallback, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import { Box, Divider, Slide, Typography } from '@mui/material';
import { MapPosition } from 'types/common';
import RoomIcon from '@mui/icons-material/Room';
import PushPinIcon from '@mui/icons-material/PushPin';
import _ from 'lodash';
import Geocode from 'react-geocode';
import IconButton from '@mui/material/IconButton';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

interface Props {
  position: MapPosition;
  handleChangePosition: any;
}

interface MarkerProps {
  lat: number;
  lng: number;
  text?: string;
}

function Marker({ lat, lng, text }: MarkerProps) {
  return (
    <Box sx={{ position: 'relative' }}>
      <Box
        sx={{
          position: 'absolute',
          top: '-32px',
          left: '-18px',
        }}
      >
        <RoomIcon sx={{ color: '#8109d6', fontSize: '2rem' }}></RoomIcon>
      </Box>
    </Box>
  );
}

function SubMarker({ lat, lng, text }: MarkerProps) {
  return (
    <Box sx={{ position: 'relative' }}>
      <Box
        sx={{
          position: 'absolute',
          top: '-32px',
          left: '-18px',
        }}
      >
        <PushPinIcon sx={{ color: '#2265f5', fontSize: '2rem' }}></PushPinIcon>
      </Box>
    </Box>
  );
}

const defaultProps = {
  center: {
    lat: 10.99835602,
    lng: 77.01502627,
  },
  zoom: 5,
};

interface Center {
  lat: number;
  long: number;
}

interface InforPopup {
  address?: string;
  mapPosition?: MapPosition;
}

function GoogleMap({ position, handleChangePosition }: Props) {
  const [pst, setPst] = useState<MapPosition>({});
  const [center, setCenter] = useState<Center>({
    lat: 10.99835602,
    long: 77.01502627,
  });
  const [infoPopup, setInfoPopup] = useState<InforPopup>({});
  const [isOpenPopup, setIsOpenPopup] = useState<boolean>(false);

  const debounceLoadData = useCallback(
    _.debounce((p) => {
      if (p.lat && p.long) {
        setPst(p);
        setCenter(p);
      } else {
        setPst({});
      }
    }, 1000),
    [],
  );

  useEffect(() => {
    debounceLoadData(position);
  }, [position]);

  return (
    <Box sx={{ height: '600px', width: '100%', position: 'relative', overflow: 'hidden' }}>
      <GoogleMapReact
        defaultCenter={defaultProps.center}
        center={{
          lat: center.lat,
          lng: center.long,
        }}
        onClick={(value: any) => {
          if (isOpenPopup) {
            setIsOpenPopup(false);
          } else {
            try {
              Geocode.setApiKey('AIzaSyAT-29Vo1xQZU4nCKMCgvKfRivVJ2KkHhU');
              Geocode.fromLatLng(String(value.lat), value.lng).then(
                (response) => {
                  const address = response.results[0].formatted_address;
                  setInfoPopup({
                    address: address,
                    mapPosition: {
                      lat: value.lat,
                      long: value.lng,
                    },
                  });
                  setIsOpenPopup(true);
                },
                (error) => {
                  console.error(error);
                },
              );
            } catch (err) {
              console.error(err);
            }
          }
        }}
        defaultZoom={defaultProps.zoom}
        yesIWantToUseGoogleMapApiInternals={true}
      >
        {pst.lat && pst.long ? <Marker lat={pst.lat} lng={pst.long} text='Your position' /> : null}
        {infoPopup.mapPosition?.lat && infoPopup.mapPosition.long && isOpenPopup ? (
          <SubMarker
            lat={infoPopup.mapPosition?.lat}
            lng={infoPopup.mapPosition.long}
            text={infoPopup.address}
          ></SubMarker>
        ) : null}
      </GoogleMapReact>
      <Box
        sx={{
          position: 'absolute',
          bottom: '12px',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        <Slide direction='up' in={isOpenPopup} mountOnEnter unmountOnExit>
          <Box
            sx={{
              backgroundColor: 'white',
              borderRadius: '6px',
              padding: '8px',
              boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
            }}
          >
            <Box sx={{ display: 'flex', gap: '4px' }}>
              <Box sx={{ width: '100px' }}>
                <img
                  style={{ width: '100%', objectFit: 'contain' }}
                  src='https://img.freepik.com/free-vector/city-skyline-concept-illustration_114360-8923.jpg'
                ></img>
              </Box>
              <Box>
                <Box sx={{ width: '200px' }}>
                  <Typography
                    sx={{
                      fontSize: '.8rem',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'wrap',
                      WebkitLineClamp: '2',
                      overflow: 'hidden',
                      display: '-webkit-box',
                      WebkitBoxOrient: 'vertical',
                      margin: '0 auto',
                      height: '40px',
                    }}
                  >
                    {infoPopup.address} sdfdsf sdfsdf sdfsdf sdfsdf sdf asdsd asdasd adasd asds
                    adasd adasd
                  </Typography>
                </Box>
                <Divider sx={{ margin: '4px 0' }}></Divider>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography sx={{ fontSize: '.6rem' }}>{infoPopup.mapPosition?.lat}</Typography>
                  <Typography sx={{ fontSize: '.6rem' }}>{infoPopup.mapPosition?.long}</Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyItems: 'center' }}>
                <IconButton
                  onClick={() => {
                    handleChangePosition(infoPopup.mapPosition);
                    setIsOpenPopup(false);
                  }}
                >
                  <ExitToAppIcon />
                </IconButton>
              </Box>
            </Box>
          </Box>
        </Slide>
      </Box>
    </Box>
  );
}

export default GoogleMap;
