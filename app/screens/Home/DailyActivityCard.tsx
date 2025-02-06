// import React, { useState } from 'react';
// import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Image, Keyboard, Alert, ActivityIndicator } from 'react-native';
// import {useColor} from '../../Constants/Color';
// import { MaterialCommunityIcons } from '@expo/vector-icons';
// import * as DocumentPicker from 'expo-document-picker';
// import * as ImagePicker from 'expo-image-picker';
// import * as Location from 'expo-location';
// import { useNavigation } from '@react-navigation/native';
// import { StatusVisitEnum, useCreateVisitComentMutation, useCreateVisitMutation, useFinishVisitMutation, useUpdateVisitMutation, useVisitFindOneArgQuery, useVisitsQuery, VisitComentStatusEnum, VisitComentTypeEnum } from '../../graphql/generated/graphql';
// import useUser from '../../context/useUser';
// import { ToastyErrorGraph } from '../../graphql';
// import dayjs, { Dayjs } from 'dayjs';
// const { color } = useColor();

// const DailyActivityCard = () => {
//   const [isOpen, setIsOpen] = useState(true);
//   const [loading, setLoading] = useState(false); // Estado para cargar
//   const [loadingF, setLoadingF] = useState(false); // Estado para cargar
//   const [loadingC, setLoadingC] = useState(false); // Estado para cargar

//   const [comment, setComment] = useState('');
//   const [activities, setActivities] = useState<{ text: string; timestamp: string; image?: string; file?: string }[]>([]);
//   const [isDayStarted, setIsDayStarted] = useState(false); // Estado para controlar si el día ha comenzado
//   const [createVisit] = useCreateVisitMutation();
//   const [updateVisit] = useFinishVisitMutation();
//   const [commentAdd] = useCreateVisitComentMutation()
//   const toggleOpen = () => {
//     setIsOpen(!isOpen);
//   };
//   const {user} = useUser()
//   const {data, error, loading: loadingS, refetch} = useVisitFindOneArgQuery({
//     variables: {
//       where: {
//         user: {
//           _eq: user.id
//         },
//         status: {
//           _eq: StatusVisitEnum.Initiated
//         }

//       }
//     }
//   })
//   const handleStartDay = async () => {
//     Alert.alert('Alerta', '¿Estas seguro que quieres comenzar con la actividad?', 
//       [
//         {
//           isPreferred: true,
//           text: 'SI',
//           onPress:  async ()=> {
//             const { status } = await Location.requestForegroundPermissionsAsync(); // Solicitar permisos de ubicación
//             if (status === 'granted') {
//               const location = await Location.getCurrentPositionAsync({}); // Obtener la ubicación actual
//               const locationString = `Lat: ${location.coords.latitude}, Lon: ${location.coords.longitude}`;
//               try {
//                 setLoading(true)
//                 const res = await createVisit({
//                   variables: {
//                     createInput: {
//                       dateVisit: new Date(),
//                       status: StatusVisitEnum.Initiated,
//                       userId: user.id || '',
//                       description: comment,
//                       latitude: location.coords.latitude.toString(),
//                       longitude: location.coords.longitude.toString()
//                     }
//                   }
//                 })
//                 if(res.errors){
//                   Alert.alert("HUBO UN ERROR", res.errors[0].message, [ {text: 'ACEPTAR', style: 'default'}]);
//                   return
//                 }
//                 setComment('')
//                 Alert.alert("¡Muy bien!", 'El proceso termino con éxito', [ {text: 'ACEPTAR', style: 'default'}]);
//               }catch(err){
//                 const menssage = ToastyErrorGraph(err as any);
//                 Alert.alert("HUBO UN ERROR", menssage, [ {text: 'ACEPTAR', style: 'default'},])
//               }finally{
//                 refetch()
//                 setLoading(false); // Establecer carga en falso al finalizar

//               }
//             } else {
//               Alert.alert('Permiso de ubicación no concedido');
//             }
//           }
//         }, 
//         {
//           text: 'NO'
//         }
//       ]
//     )

//   };
//   const handleFinishDay = async () => {
//     Alert.alert('Alerta', '¿Estas seguro que quieres finalizar con la actividad?', 
//       [
//         {
//           isPreferred: true,
//           text: 'SI',
//           onPress:  async ()=> {
//             const { status } = await Location.requestForegroundPermissionsAsync(); // Solicitar permisos de ubicación
//             if (status === 'granted') {
//               const location = await Location.getCurrentPositionAsync({}); // Obtener la ubicación actual
//               const locationString = `Lat: ${location.coords.latitude}, Lon: ${location.coords.longitude}`;
//               try {
//                 setLoadingF(true)
//                 const res = await updateVisit({
//                   variables: {
//                     updateStatusInput: {
//                       dateVisit: new Date(),
//                       status: StatusVisitEnum.Initiated,
//                       id: data?.visitFindOneArg?.id || '',
//                       description: comment,
//                       latitude: location.coords.latitude.toString(),
//                       longitude: location.coords.longitude.toString()
//                     }
//                   }
//                 })
//                 if(res.errors){
//                   Alert.alert("HUBO UN ERROR", res.errors[0].message, [ {text: 'ACEPTAR', style: 'default'}]);
//                   return
//                 }
//                 setComment('')
//                 Alert.alert("¡Muy bien!", 'El proceso termino con éxito', [ {text: 'ACEPTAR', style: 'default'}]);
//               }catch(err){
//                 const menssage = ToastyErrorGraph(err as any);
//                 Alert.alert("HUBO UN ERROR", menssage, [ {text: 'ACEPTAR', style: 'default'},])
//               }finally{
//                 refetch()
//                 setLoadingF(false); // Establecer carga en falso al finalizar
//               }
//             } else {
//               Alert.alert('Permiso de ubicación no concedido');
//             }
//           }
//         }, 
//         {
//           text: 'NO'
//         }
//       ]
//     )
//   }
//   const handleCommentAdd = async () => {
//     Alert.alert('Alerta', '¿Estas seguro que quieres agregar el comentario?', 
//       [
//         {
//           isPreferred: true,
//           text: 'SI',
//           onPress:  async ()=> {
//             const { status } = await Location.requestForegroundPermissionsAsync(); // Solicitar permisos de ubicación
//             if (status === 'granted') {
//               const location = await Location.getCurrentPositionAsync({}); // Obtener la ubicación actual
//               const locationString = `Lat: ${location.coords.latitude}, Lon: ${location.coords.longitude}`;
//               try {
//                 setLoadingC(true)
//                 const res = await commentAdd({
//                   variables: {
//                     createInput: {
//                       dateFull: new Date(),
//                       date: new Date(),
//                       time: new Date(),
//                       visitId: data?.visitFindOneArg?.id || '',
//                       description: comment,
//                       type: VisitComentTypeEnum.Intermedio,
//                       latitude: location.coords.latitude.toString(),
//                       longitude: location.coords.longitude.toString()
//                     }
//                   }
//                 })
//                 if(res.errors){
//                   Alert.alert("HUBO UN ERROR", res.errors[0].message, [ {text: 'ACEPTAR', style: 'default'}]);
//                   return
//                 }
//                 setComment('')
//                 Alert.alert("¡Muy bien!", 'El proceso termino con éxito', [ {text: 'ACEPTAR', style: 'default'}]);
//               }catch(err){
//                 const menssage = ToastyErrorGraph(err as any);
//                 Alert.alert("HUBO UN ERROR", menssage, [ {text: 'ACEPTAR', style: 'default'},])
//               }finally{
//                 refetch()
//                 setLoadingC(false); // Establecer carga en falso al finalizar
//               }
//             } else {
//               Alert.alert('Permiso de ubicación no concedido');
//             }
//           }
//         }, 
//         {
//           text: 'NO'
//         }
//       ]
//     )
//   }
//   const navigator = useNavigation()
//   return (
//     <View style={styles.card}>
//       <TouchableOpacity onPress={toggleOpen} style={styles.header}>
//         <Text style={styles.headerText}>
//           {data?.visitFindOneArg ? 'Estoy trabajando en...' : 'Voy a comenzar a...'}
//         </Text>
//         <MaterialCommunityIcons name={isOpen ? 'arrow-up-drop-circle' : 'arrow-down-drop-circle'} size={20} color={color.primary} />
//         {/*<MaterialCommunityIcons onPress={()=> {navigator.navigate("ActivityDetails", {id:'123'})}} name='chevron-triple-right' size={26} color={color.coral} />*/}
//       </TouchableOpacity>
      
//       {isOpen && (
//         <View style={styles.content}>
//           <TextInput
//             style={styles.textArea}
//             placeholder="Comentario antes de iniciar la actividad..."
//             value={comment}
//             onChangeText={setComment}
//             multiline
//             numberOfLines={4}
//           /> 
//           {
//             (data?.visitFindOneArg)
//             ?
//             <>
//             <TouchableOpacity disabled={loading || loadingC} onPress={handleCommentAdd} style={styles.commentDayButton}>
//             {loading || loadingC? (
//                 <ActivityIndicator size="small" color="#fff" />
//               ) : (
//                 <Text style={styles.startDayText}>{'Agregar Comentario'}</Text>
//               )}
//             </TouchableOpacity>
//             <TouchableOpacity disabled={loading || loadingF} onPress={handleFinishDay} style={styles.finishDayButton}>
//             {loading || loadingF? (
//                 <ActivityIndicator size="small" color="#fff" />
//               ) : (
//                 <Text style={styles.startDayText}>{'Finalizar Actividad'}</Text>
//               )}
//             </TouchableOpacity>
//             </>
//             :
//             <TouchableOpacity disabled={loading || loadingS} onPress={handleStartDay} style={styles.startDayButton}>
//             {loading || loadingS? (
//                 <ActivityIndicator size="small" color="#fff" />
//               ) : (
//                 <Text style={styles.startDayText}>{'Iniciar Actividad'}</Text>
//               )}
//             </TouchableOpacity>
//           }

//           <>
//             <ScrollView style={styles.activityList} showsVerticalScrollIndicator={false}>
//               {data?.visitFindOneArg?.visitItem.map((activity, index) => (
//                 <View key={index} style={styles.activityItem}>
//                   <Text style={styles.activityText}>• {activity.description} 
//                   <Text style={styles.timestamp}>({dayjs(activity.dateFull).format('HH:mm:ss')})</Text></Text>
//                   <TouchableOpacity onPress={() => console.log(index)}>
//                     <MaterialCommunityIcons name="pencil" color={color.primary} size={20} />
//                   </TouchableOpacity>
//                 </View>
//               ))}
//             </ScrollView>
//           </>
//         </View>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   card: {
//     backgroundColor: color.white,
//     padding: 20,
//     borderRadius: 10,
//     shadowColor: color.lightBeige,
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, height: 2 },
//     shadowRadius: 4,
//     elevation: 5,
//     margin: 20,
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   headerText: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: color.darkGray,
//   },
//   content: {
//     marginTop: 10,
//   },
//   startDayButton: {
//     backgroundColor: color.primary,
//     padding: 10,
//     borderRadius: 5,
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   finishDayButton: {
//     backgroundColor: color.coral,
//     padding: 10,
//     borderRadius: 5,
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   commentDayButton: {
//     backgroundColor: color.primary,
//     padding: 10,
//     borderRadius: 5,
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   startDayText: {
//     color: color.white,
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   iconButton: {
//     padding: 10,
//   },
//   textArea: {
//     borderWidth: 1,
//     borderColor: color.lightBeige,
//     borderRadius: 5,
//     padding: 10,
//     marginBottom: 10,
//     height: 80,
//     textAlignVertical: 'top',
//   },
//   iconContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 10,
//   },
//   activityList: {
//     marginTop: 10,
//     maxHeight: 200,
//   },
//   activityItem: {
//     marginBottom: 10,
//     padding: 10,
//     borderRadius: 5,
//     backgroundColor: color.lightBeige,
//     borderLeftWidth: 4,
//     borderLeftColor: color.primary,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
//   activityText: {
//     fontSize: 16,
//     color: color.darkGray,
//     flex: 1,
//   },
//   timestamp: {
//     fontSize: 10,
//     color: color.darkGray,
//   },
//   image: {
//     width: '100%',
//     height: 100,
//     borderRadius: 5,
//     marginTop: 5,
//   },
//   fileLink: {
//     marginTop: 5,
//   },
//   fileText: {
//     color: color.primary,
//     textDecorationLine: 'underline',
//   },
// });

// export default DailyActivityCard;
