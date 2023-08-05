import React from 'react'
import a from "../assets/chaussure.png"
import b from '../assets/chemisse.png'
import c from '../assets/parfume.png'
import d from '../assets/vh.png'
import e from '../assets/vf.webp'
import f from '../assets/ve.png'
import g from '../assets/vs.png'
import h from '../assets/sacs.png'
import i from '../assets/tissue.png'



const Options = () => {
  return (
    <div className='nos-options-container section-center'>
      <h2>Nos Options</h2>
      <div className='container-options'>
        <div className='option'>
          <img src={a} alt='Chemises' />
          <h3>Chemises</h3>
          <p>
            Découvrez notre collection exclusive de chemises pour hommes et
            femmes. Des modèles élégants pour toutes les occasions, du casual au
            formel.
          </p>
        </div>
        <div className='option'>
          <img src={b} alt='Chaussures' />
          <h3>Chaussures</h3>
          <p>
            Trouvez la paire parfaite parmi notre sélection de chaussures
            tendance. Des baskets décontractées aux talons hauts, nous avons ce
            qu'il vous faut.
          </p>
        </div>
        <div className='option'>
          <img src={c}alt='Parfums' />
          <h3>Parfums</h3>
          <p>
            Plongez dans un monde envoûtant de parfums exquis. Des fragrances
            uniques pour hommes et femmes qui laisseront une impression durable.
          </p>
        </div>
        <div className='option'>
          <img src={d} alt='Vêtements Homme' />
          <h3>Vêtements Homme</h3>
          <p>
            Découvrez notre collection de vêtements élégants pour hommes. Des
            tenues pour tous les styles et toutes les saisons.
          </p>
        </div>
        <div className='option'>
          <img src={e} alt='Vêtements Femme' />
          <h3>Vêtements Femme</h3>
          <p>
            Parcourez notre sélection de vêtements pour femmes. Des robes de
            soirée aux tenues décontractées, trouvez votre style ici.
          </p>
        </div>
        <div className='option'>
          <img src={f} alt='Vêtements Enfant' />
          <h3>Vêtements Enfant</h3>
          <p>
            Des vêtements adorables pour les petits. Trouvez des tenues
            confortables et élégantes pour vos enfants.
          </p>
        </div>
        <div className='option'>
          <img src={g}alt='Vaisselle' />
          <h3>Vaisselle</h3>
          <p>
            Ajoutez une touche d'élégance à votre table avec notre sélection de
            vaisselle de qualité. Des assiettes aux verres, faites votre choix.
          </p>
        </div>
        <div className='option'>
          <img src={h} alt='Sacs' />
          <h3>Sacs</h3>
          <p>
            Trouvez le sac parfait pour chaque occasion. Des sacs à main aux
            sacs à dos, nous avons des options pour tous les goûts.
          </p>
        </div>
        <div className='option'>
          <img src={i} alt='Tissue' />
          <h3>Tissue</h3>
          <p>
            Des tissus de qualité pour vos projets de couture et d'artisanat.
            Explorez notre collection de tissus uniques et inspirants.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Options
