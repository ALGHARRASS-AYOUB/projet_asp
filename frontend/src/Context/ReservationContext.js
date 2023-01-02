import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { getUrl } from "../API";
import { toast } from "react-toastify";

const reservationContext = createContext();

export const useReservation = () => {
  const context = useContext(reservationContext);
  if (!context) throw new Error("Reservation Provider is missing");
  return context;
};

const reservationUrl = getUrl("Reservations");

const userInfo = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null


export const ReservationContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const getOwnerReservations = async (id) => {
    setLoading(true);
    try {
       const config = {
         headers: {
           'Content-Type': 'application/json',
           Authorization: `Bearer ${userInfo.token}`,
         },
       };
      const { data } = await axios.get(
        `${reservationUrl}/getOwnerReservations?idUser=${id}`,
        config,
      );
      console.log(data)
      setLoading(false);
      return data;
    } catch (error) {
      console.log(error.response);
      setLoading(false);
    }
  };
  const getReservations = async () => {
    setLoading(true);
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.get(
        `${reservationUrl}/GetReservations`,
        config,
      );
      setLoading(false);
      return data;
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error.response);
      setLoading(false);
    }
  };
  const getReservationsCount = async () => {
    setLoading(true);
    try {
       const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        }
      const { data } = await axios.get(
        `${reservationUrl}/getReservationsCount`,config
      );
      setLoading(false);
      console.log(data)
      return data;
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error.response);
      setLoading(false);
    }
  };

   const postReservation = async(data) => {
            setLoading(true)
            try {
                 const config = {
                   headers: {
                     'Content-Type': 'application/json',
                     Authorization: `Bearer ${userInfo.token}`,
                   },
                 };
                 const { res } = await axios.post(
                    `${reservationUrl}/AddReservation`, data,
                   config,
                 );
                 toast.success('Updated successfully');
                 console.log(res);
                 setLoading(false);
            } catch (error) {
                  toast.error('Something went wrong');
                  console.log(error);
                  setLoading(false);
            }
          }

  return (
    <reservationContext.Provider 
    value={{
      loading,
      getOwnerReservations,
      getReservationsCount,
      getReservations,
      postReservation,
      loading,
      setLoading,
      }}>
      {children}
    </reservationContext.Provider>
  );
};
