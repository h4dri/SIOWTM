import React, { useContext, useEffect, useState } from 'react';
import '../styles/AppointmentListItem.css';
import { IVisit, UpdateVisitModel } from '../models/VisitModel';
import Moment from 'moment';
import 'moment/locale/pl';
import { RootStoreContext } from '../stores/RootStore';
import { toast } from 'react-toastify';

function AppointmentListItem(props: { item: IVisit, isDoctor: boolean}) {
    const rootStore = useContext(RootStoreContext)

    var propsDate = Moment(props.item.date).format('yyyy-MM-DDTHH:mm');
    
    const [isShow, setIsShow] = useState(false);
    const [readOnly, setReadOnly] = useState(true);
    const [title, setTitle] = useState(props.item.title)
    const [date, setDate] = useState(propsDate);
    const [description, setDescription] = useState(props.item.description);
    const [category, setCategory] = useState(props.item.category);
    const [clientName, setClientName] = useState('')
    const [doctorName, setDoctorName] = useState('')
    const [editButtonText, setEditButtonText] = useState("Edytuj wizytę");
    const [catList, setCatList] = useState<Array<String>>([]);

    useEffect(() => {
        if(props.item.attendees[0].isDoctor) {
            setDoctorName(props.item.attendees[0].displayName);
            setClientName(props.item.attendees[1].displayName);
        } else {
            setDoctorName(props.item.attendees[1].displayName);
            setClientName(props.item.attendees[0].displayName);
        }
    }, [])

    useEffect(() => {
        rootStore.categoriesStore.loadCategories()
            .then(() => {
                setCatList(rootStore.categoriesStore.categories)
            });
    }, [rootStore.categoriesStore]);

    function handleShowHideButton(){
        isShow ? setIsShow(false) : setIsShow(true);
    }

    function handleChangeTitle(event: React.ChangeEvent<HTMLInputElement>) {
        setTitle(event.target.value);
    }

    function handleChangeDate(event: React.ChangeEvent<HTMLInputElement>) {
        setDate(event.target.value);
    }

    function handleChangeDescription(event: React.ChangeEvent<HTMLInputElement>) {
        setDescription(event.target.value);
    }

    function handleChangeCategory() {
        const e = document.getElementById(`categories${props.item.id}`) as HTMLSelectElement
        var CurValue = e.options[e.selectedIndex].value;
        console.log(CurValue)
        setCategory(CurValue)
    }

    function handleEditButton(){
        readOnly ? console.log("Kliknięto edycję!") : console.log("Zapisano!")

        if (readOnly === false) {
            const visitToUpdate: UpdateVisitModel = {
                id: props.item.id,
                title: title,
                description: description,
                category: category,
                date: new Date(date),
                docName: doctorName
            };
            rootStore.visitsStore.updateVisit(visitToUpdate)
                .then(() => {
                    toast.success('Pomyślnie zakutalizowano!');
                });
        }
        readOnly ? setReadOnly(false) : setReadOnly(true)
        readOnly ? setEditButtonText("Zapisz") : setEditButtonText("Edytuj wizytę")
    }

    function delay(ms: number) {
        return new Promise( resolve => setTimeout(resolve, ms) );
    }

    function handleDeleteButton(){
        rootStore.visitsStore.deleteVisit(props.item.id)
            .then(async () => {
                toast.success('Pomyślnie usunięto wizytę!', {autoClose: 3000})
                await delay(3000);
                window.open("/customerPanel", "_self")
            })
    }

    function handleEndButton(){
        const visitToUpdate: UpdateVisitModel = {
            id: props.item.id,
            title: title,
            description: description,
            category: category,
            date: new Date(date),
            docName: doctorName,
            isEnded: true
        };
        rootStore.visitsStore.updateVisit(visitToUpdate)
            .then(() => {
                toast.success('Pomyślnie zakończono wizytę!');
            });
    }

    Moment.locale('pl')

    return (
           <div id="appointmentsItemContainer">
               <div id="mainContent" onClick={handleShowHideButton}>
                    <div id="title">{props.item.title}</div>
                    <div id="startDateShort">{Moment(props.item.date).format('DD MMMM yyyy HH:mm')}</div>
                    <div id="showHideButton">{isShow ? "-" : "+"}</div>
               </div>
               <div id="showableContent" style={{ display: isShow ? "block" : "none"}}>
                    <div id="closeButton">
                        <input type="submit" value="&#10005;" onClick={handleShowHideButton}/>
                    </div>
                    <div className="showableContentArea"><p>Tytuł:</p>
                        <input type="text" value={title} onChange={handleChangeTitle} disabled={readOnly}/>
                    </div>
                    <div className="showableContentArea"><p>Szczegóły:</p>
                        <input type="text" value={description} onChange={handleChangeDescription} disabled={readOnly} />
                    </div>
                    <div className="showableContentArea"><p>Data:</p>
                        <input type="datetime-local" value={date} min={date} onChange={handleChangeDate} disabled={readOnly} />
                    </div>
                    <div className="showableContentArea"><p>Kategoria:</p>
                        <select id={`categories${props.item.id}`} onChange={handleChangeCategory} value={category} disabled={readOnly} >
                            {catList.map((item, key) => {
                                return <option key={key} value={item.toString()} >{item.toString()}</option>
                            })}
                        </select>
                    </div>
                    {
                        props.isDoctor ?
                            <div className="showableContentArea">Pacjent:<br />&emsp;<i>{clientName}</i></div>
                            :
                            <div className="showableContentArea">Doktor:<br />&emsp;<i>{doctorName}</i></div>
                    }
                    {
                        props.item.isEnded ? (
                            <div id="buttons"><p>Wizyta zakończona.</p></div>
                        ) : (
                            <div id="buttons">
                                <input type="submit" id="editButton" value={editButtonText} onClick={handleEditButton}/>
                                {
                                    !props.isDoctor ?
                                        <input type="submit" value="Usuń wizytę" onClick={handleDeleteButton}/>
                                        :
                                        <input type="submit" value="Zakończ wizytę" onClick={handleEndButton}/>
                                }
                            </div>
                        )
                    }
               </div>
           </div>
    );
}

export default AppointmentListItem;