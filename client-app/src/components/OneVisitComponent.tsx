import React, { useContext, useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { RootStoreContext } from '../stores/RootStore';
import '../styles/OneVisitStyle.css';
import HeaderCP from './HeaderCP';
import { observer } from 'mobx-react-lite';
import { IVisit, UpdateVisitModel } from '../models/VisitModel';
import VisitChatComponent from './VisitChatComponent';
import { toast, ToastContainer } from 'react-toastify';

interface DetailParams {
    id: string
}

const OneVisitComponent: React.FC<RouteComponentProps<DetailParams>> = ({match}) => {
    const rootStore = useContext(RootStoreContext);

    const [visit, setVisit] = useState<IVisit | null>()
    const [readOnly, setReadOnly] = useState(true)
    const [editButtonText, setEditButtonText] = useState("Edytuj wizytę")

    
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('2021-01-01T01:01');
    const [catList, setCatList] = useState<Array<String>>([]);
    const [category, setCategory] = useState('');
    const [isEnded, setIsEnded] = useState(true);
    const [doctorName, setDoctorName] = useState('');
    const [clientName, setClientName] = useState('');

    useEffect(() => {
        rootStore.visitsStore.loadOneVisit(match.params.id)
            .then(() => {
                if(rootStore.visitsStore.visit){
                    setVisit(rootStore.visitsStore.visit)
                    if(rootStore.visitsStore.visit.attendees[0].isDoctor) {
                        setDoctorName(rootStore.visitsStore.visit.attendees[0].displayName);
                        setClientName(rootStore.visitsStore.visit.attendees[1].displayName);
                    } else {
                        setDoctorName(rootStore.visitsStore.visit.attendees[1].displayName);
                        setClientName(rootStore.visitsStore.visit.attendees[0].displayName);
                    }
                    setTitle(rootStore.visitsStore.visit.title)
                    setDescription(rootStore.visitsStore.visit.description)
                    setDate(rootStore.visitsStore.visit.date.toString())
                    setCategory(rootStore.visitsStore.visit.category)
                    setIsEnded(rootStore.visitsStore.visit.isEnded)
                }
            })
    }, [rootStore.visitsStore])

    useEffect(() => {
        rootStore.categoriesStore.loadCategories()
            .then(() => {
                setCatList(rootStore.categoriesStore.categories)
            });
    }, [rootStore.categoriesStore]);

    const handleBackButton = () => {
        rootStore.userStore.user!.isDoctor === true ? window.open("/doctorPanel", "_self") : window.open("/customerPanel", "_self")
    }

    function handleEditVisitButton(){
        readOnly ? console.log("Kliknięto edycję!") : console.log("Zapisano!")

        if (readOnly === false && visit) {
            const visitToUpdate: UpdateVisitModel = {
                id: visit?.id,
                title: visit?.title,
                description: visit?.description,
                category: visit?.category,
                date: visit?.date,
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

    const handleDelVisitButton = () => {
        if(visit){
            rootStore.visitsStore.deleteVisit(visit.id)
                .then(() => {
                    rootStore.userStore.user!.isDoctor === true ? window.open("/doctorPanel", "_self") : window.open("/customerPanel", "_self")
                })
        }
    }

    function handleEndVisitButton(){
        if(visit){
            const visitToUpdate: UpdateVisitModel = {
                id: visit.id,
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
    }

    function handleChangeTitle(event: React.ChangeEvent<HTMLInputElement>) {
        setTitle(event.target.value);
    }

    function handleChangeDescription(event: React.ChangeEvent<HTMLTextAreaElement>) {
        setDescription(event.target.value);
    }

    function handleChangeDate(event: React.ChangeEvent<HTMLInputElement>) {
        setDate(event.target.value);
    }

    function handleChangeCategory() {
        const e = document.getElementById(`categories${visit?.id}`) as HTMLSelectElement
        var CurValue = e.options[e.selectedIndex].value;
        console.log(CurValue)
        setCategory(CurValue)
        console.log(category)
    }

    return(
        <div id="oneVisitComponent">
            <ToastContainer />
            <HeaderCP firstName="Jan" lastName="Padżet" isDoctor={false}/>
            {
                isEnded ? (
                    <div id="visitEnded"><h1>Wizyta zakończona.</h1></div>
                ) : (
                    <div id="buttons">
                        <input type="submit" value="Wróć" onClick={handleBackButton} />
                        <input type="submit" value={editButtonText} onClick={handleEditVisitButton} />
                        {
                            rootStore.userStore.user?.isDoctor ?
                                <input type="submit" value="Zakończ wizytę" onClick={handleEndVisitButton}/>
                                :
                                <input type="submit" value="Usuń wizytę" onClick={handleDelVisitButton} />
                        }
                    </div>
                )
            }
            <div className="showableContentArea"><p>Tytuł:</p>
                <input type="text" value={title} onChange={handleChangeTitle} disabled={readOnly}/>
            </div>
            <div className="showableContentArea"><p>Data:</p>
                <input type="datetime-local" value={date} min={date} onChange={handleChangeDate} disabled={readOnly} />
            </div>
            <div className="showableContentArea"><p>Kategoria:</p>
                {
                    visit ? (
                        <select id={`categories${visit.id}`} onChange={handleChangeCategory} value={category} disabled={readOnly} >
                            {catList.map((item, key) => {
                                return <option key={key} value={item.toString()} >{item.toString()}</option>
                            })}
                        </select>
                    ) : (
                        null
                    )
                }
            </div>
            {
                rootStore.userStore.user?.isDoctor ?
                    <div className="showableContentArea">Pacjent:<br />&emsp;<i>{clientName}</i></div>
                    :
                    <div className="showableContentArea">Doktor:<br />&emsp;<i>{doctorName}</i></div>
            }
            <div className="showableContentArea descriptionContent"><p>Szczegóły:</p>
                <textarea id="descriptionInput" value={description} onChange={handleChangeDescription} disabled={readOnly} style={{ width: "calc(100% - 16px)" }}/>
            </div>
            <div className="showableContentArea">
                <VisitChatComponent isEnded={isEnded}/>
            </div>
        </div>
    )
}

export default observer(OneVisitComponent);