import React, { useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';
import { NewVisit } from '../models/VisitModel';
import { RootStoreContext } from '../stores/RootStore';
import '../styles/CreateVisitStyle.css';

const CreateVisitComponent = () => {
    const rootStore = useContext(RootStoreContext)
    
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    var HH = String(today.getHours()).padStart(2, '0');
    var MM = String(today.getMinutes()).padStart(2, '0');
    var todayString = yyyy + "-" + mm + "-" + dd + "T" + HH + ":" + MM

    const [title, setTitle] = useState('');
    const [date, setDate] = useState(todayString);
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [doctor, setDoctor] = useState('');
    const [buttonStatus, setButtonStatus] = useState(true);
    const [catList, setCatList] = useState<Array<String>>([])
    const [docList, setDocList] = useState<Array<String>>([])

    const visitToCreate: NewVisit = {
        title: title,
        description: description,
        category: category,
        date: new Date(date),
        docName: doctor
    };

    useEffect(() => {
        rootStore.categoriesStore.loadCategories()
            .then(() => {
                setCatList(rootStore.categoriesStore.categories)
            });
    }, [rootStore.categoriesStore]);

    useEffect(() => {
        rootStore.doctorsStore.loadDoctors()
            .then(() => {
                setDocList(rootStore.doctorsStore.doctors)
            });
    }, [rootStore.doctorsStore]);

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
        const e = document.getElementById("categories") as HTMLSelectElement
        var CurValue = e.options[e.selectedIndex].value;
        setCategory(CurValue)
    }

    function handleChangeDoctors() {
        const e = document.getElementById("doctors") as HTMLSelectElement
        var CurValue = e.options[e.selectedIndex].value;
        setDoctor(CurValue)
    }

    function delay(ms: number) {
        return new Promise( resolve => setTimeout(resolve, ms) );
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        rootStore.visitsStore.createVisit(visitToCreate)
            .then(async () => {
                toast.success('Pomyślnie utworzono nową wizytę!', {autoClose: 3000})
                await delay(3000);
                window.open("/customerPanel", "_self")
            });
        event.preventDefault();
    }

    function checkButtonStatus() {
        if (
            title !== '' &&
            date !== '' &&
            description !== '' &&
            category !== '' &&
            doctor !== ''
        ) setButtonStatus(false);
        else setButtonStatus(true);
    }

    function validate(event: React.KeyboardEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement, MouseEvent>){
        checkButtonStatus();
    }

    return(
        <>
            <form onSubmit={handleSubmit}>
                <div id="createVisitArea" onKeyUp={validate} onClick={validate}>
                    <div className="createVisitElement">
                        <p>Tytuł:</p>
                        <input type="text" value={title} onChange={handleChangeTitle} />
                    </div>
                    <div className="createVisitElement">
                        <p>Termin wizyty:</p>
                        <input type="datetime-local" value={date} min={todayString} onChange={handleChangeDate} />
                    </div>
                    <div className="createVisitElement">
                        <p>Kategoria:</p>
                        <select id="categories" onChange={handleChangeCategory}>
                            <option value=""></option>
                            {catList.map((item, key) => {
                                return <option key={key} value={item.toString()}>{item.toString()}</option>
                            })}
                        </select>
                    </div>
                    <div className="createVisitElement">
                        <p>Lekarz:</p>
                        <select id="doctors" onChange={handleChangeDoctors}>
                            <option value=""></option>
                            {docList.map((item, key) => {
                                return <option key={key} value={item.toString()}>{item.toString()}</option>
                            })}
                        </select>
                    </div>
                    <div className="createVisitElement">
                        <p>Opis:</p>
                        <input type="text" value={description} onChange={handleChangeDescription} />
                    </div>
                    <div id="createVisitButton">
                        <i>* wszystkie pola należy uzupełnić aby móc stworzyć wizytę</i><br /> 
                        <i>** aby stworzyć wizytę należy posiadać aktywowaną subskrypcję</i>
                        <input type="submit" value="Stwórz wizytę" disabled={buttonStatus} />
                    </div>
                </div>
            </form>
        </>
    )
}

export default CreateVisitComponent;