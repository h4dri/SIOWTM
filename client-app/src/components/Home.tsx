import React from 'react';
import '../styles/Home.css';
import doctorSVG from '../resources/doctor.svg';
import Header from './Header';

function Home() {
    return (
        <>
            <Header />
            <div id="home">
                <img src={doctorSVG} alt="Doctor SVG" />
                <div id="homeText">
                    <h1>SI OWTM</h1>
                    <h2>System Informatyczny Obsługi Wizyt Telemedycznych</h2>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.Nulla commodo facilisis massa, sit amet accumsan justo vulputate at.Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Aliquam quis mauris bibendum, facilisis mi vel, tempus lacus.Donec non est eget dui molestie imperdiet ac ut nunc.Praesent ac tortor convallis nulla vestibulum congue.Vivamus mauris quam, varius sed pretium id, vulputate et nibh.Nunc ornare erat ac mi feugiat finibus.Pellentesque id nibh ligula.Sed tincidunt accumsan nunc, id dapibus dui laoreet in.Nam ante mi, convallis ut feugiat eget, maximus id justo.Proin vitae erat a libero tristique efficitur vitae nec nunc.Donec vestibulum vel mi nec congue.
                    </p>
                    <p>
                        Morbi orci orci, sollicitudin pellentesque commodo ac, viverra sed nisi.Nullam condimentum ullamcorper pulvinar.Donec pellentesque tincidunt ante nec fringilla.Donec finibus neque tellus, imperdiet pellentesque tellus vulputate in.Fusce laoreet odio sed hendrerit maximus.Nam venenatis lorem aliquam augue tincidunt dictum.Donec aliquet velit eu enim fermentum, sit amet congue orci aliquet.Fusce egestas sagittis mauris, vitae volutpat libero pretium at.Nulla sit amet egestas dolor.Donec posuere vel urna ut iaculis.Nulla sit amet dolor et tortor auctor volutpat auctor facilisis ex.
                    </p>
                    <p>
                        Fusce in finibus nunc, eget pharetra tellus.Vestibulum eu rutrum velit, quis facilisis purus.Etiam mollis libero erat, a cursus lorem dapibus ac.Nam maximus aliquet elementum.Sed molestie lorem in leo tempor, ac luctus ante mollis.Pellentesque tempor nisl ac nisi aliquam lacinia.Donec placerat odio non odio vestibulum, eu sollicitudin purus semper.Duis imperdiet fringilla commodo.Aenean condimentum tempus magna, varius tempus sapien luctus quis.Duis ac maximus tortor.Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.Nunc malesuada magna non est consectetur sagittis.Sed pulvinar erat vel nisi feugiat, ut scelerisque tellus accumsan.Curabitur sit amet tortor elit.Nunc vulputate hendrerit dui, eu facilisis purus mollis nec.
                    </p>
                    <p>
                        Vestibulum at suscipit erat.Nullam eget condimentum felis.Donec non efficitur urna.Vestibulum sodales nunc at nibh placerat tempor.Vivamus sed ante id velit faucibus congue tristique vitae purus.Aenean fringilla maximus neque, eleifend fringilla elit consectetur eu.Mauris consectetur eleifend luctus.
                    </p>
                    <p>
                        Mauris pulvinar tincidunt libero, sed semper elit fermentum ut.Duis nec orci blandit, vehicula mauris dignissim, iaculis diam.Phasellus faucibus et augue id feugiat.Donec ut congue justo, quis volutpat risus.Suspendisse eget mi tortor.Pellentesque vitae elit id nibh ornare efficitur a non metus.Nulla facilisi.Phasellus at tortor ac neque venenatis elementum eu vel arcu.Ut molestie neque non vestibulum efficitur.Nunc rutrum turpis a odio egestas, eu tempor tortor tempus.Vivamus eu magna eget est laoreet mattis vitae nec diam.Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.Aenean risus risus, eleifend non gravida vel, fringilla vel magna.Integer elementum tristique efficitur.Suspendisse mollis est non efficitur molestie.
                    </p>
                </div>
            </div>
        </>
    );
}

export default Home;