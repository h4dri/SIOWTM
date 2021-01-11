import React, { useState, useEffect, useContext } from 'react';
import { RootStoreContext } from '../stores/RootStore';
import '../styles/CreateVisitStyle.css';

const CreateVisitComponent = () => {
    const rootStore = useContext(RootStoreContext)
    
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [doctorDisplayName, setDoctorDisplayName] = useState('');
    const [buttonStatus, setButtonStatus] = useState(true);
    const [catList, setCatList] = useState<Array<String>>([])

    // const visitModelElement: IVisit = {
    //     title: title,
    //     description: description,
    //     category: category
    // };

    useEffect(() => {
        rootStore.categoriesStore.loadCategories()
            .then(() => {
                setCatList(rootStore.categoriesStore.categories)
            });
    }, [rootStore.categoriesStore]);

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
        checkButtonStatus()
    }

    function handleChangeDoctorDisplayName(event: React.ChangeEvent<HTMLInputElement>) {
        setDoctorDisplayName(event.target.value);
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        alert(
            'title: ' + title + '\n' +
            'date: ' + date + '\n' +
            'description: ' + description + '\n' +
            'category: ' + category + '\n' +
            'doctorDisplayName: ' + doctorDisplayName
        );
        event.preventDefault();
    }

    function checkButtonStatus() {
        if (
            title !== '' &&
            date !== '' &&
            description !== '' &&
            category !== '' &&
            doctorDisplayName !== ''
        ) setButtonStatus(false);
        else setButtonStatus(true);
    }

    function validate(event: React.KeyboardEvent<HTMLDivElement>){
        checkButtonStatus();
    }

    return(
        <>
            <form onSubmit={handleSubmit}>
                <div id="createVisitArea" onKeyUp={validate}>
                    <div className="createVisitElement">
                        <p>Tytuł:</p>
                        <input type="text" value={title} onChange={handleChangeTitle} />
                    </div>
                    <div className="createVisitElement">
                        <p>Termin wizyty:</p>
                        <input type="text" value={date} onChange={handleChangeDate} />
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
                        <input type="text" value={doctorDisplayName} onChange={handleChangeDoctorDisplayName} />
                    </div>
                    <div className="createVisitElement">
                        <p>Opis:</p>
                        <input type="text" value={description} onChange={handleChangeDescription} />
                    </div>
                    <div id="createVisitButton">
                        <i>* wszystkie pola należy uzupełnić aby móc stworzyć wizytę</i>
                        <input type="submit" value="Stwórz wizytę" disabled={buttonStatus} />
                    </div>
                </div>
            </form>
        </>
    )
}

export default CreateVisitComponent;