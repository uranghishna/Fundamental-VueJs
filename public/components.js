const Home = {
    template: '<div>Home</div>'
}
const About = {
    template: '<div>About</div>'
}
const NotFound = {
    template: '<div>Halaman tidak ditemukan</div>'
}
const detailKelas = {
    template : `<div>
            <template v-if="detailKelas">
            <img :src="url_gambar(detailKelas.gambar)" width="200" />
            <h3>{{ detailKelas.judul }} {{ $route.params.idkelas }} </h3>
            <p>{{ detailKelas.deskripsi }}</p>
            <router-link to="/kelas">kembali</router-link>
            </template>
            <p v-else>kelas tidak ada</p>
            </div>`,
            data(){
                return{
                    detailKelas: {}
                }
            },
            created(){
                this.filterkelas()
            },
            methods: {
                filterkelas(){
                    // let kelas = JSON.parse(localStorage.getItem('kelas'))
                    let id = this.$route.params.idkelas
                    // let data = kelas.filter(k => k.id == id)
                    let kelasDetailRef = database.ref('kelas/' +id)
                    kelasDetailRef.on('value', (j) => {
                        this.detailKelas = j.val()
                    })
                    // this.detailKelas = data[0]
                },
                url_gambar: function(gambar){
                return gambar ? '../image/' +gambar : ''
            }
            }
}
const Kelas = {
    props: ['item'],
    template: `
    <div>
        <h2>Tambah Kelas</h2>
        <!-- <p><input type="text" placeholder="Nama Kelas" v-on:keyup.enter="submit"></p>
        <p><input type="text" placeholder="Nama Kelas" v-on:keyup.enter="$emit('submitkelas', $event)"></p> -->
        
        <form v-on:submit.prevent="submitkelas">
            <div class="input-group">
                <input type="text" v-model="kelas.judul" placeholder="Nama Kelas">
                <div class="error" v-if="error.judul"><small>{{ error.judul }}</small></div>    
            </div>
            <div class="input-group">
                <label>Deskripsi:</label><br>
                <textarea v-model="kelas.deskripsi"></textarea>
                <div class="error" v-if="error.deskripsi"><small>{{ error.deskripsi }}</small></div>
            </div>
            
            <div class="input-group">
                <p><img :src="previewimg" v-if="previewimg" width="200"/></p>
                <label>Masukan Gambar</label><br>
                <input type="file" ref="gambar" v-on:change="upload">
            </div>

            <button type="submit">Submit</button>
        </form>

        <hr>
        <h4>daftar kelas ({{item.length}})</h4>
        <template v-if="item.length >= 1">
        <!-- <ul v-show="item.length >= 1"> -->
            <ul>
                <li v-for="(j, i) of item">
                    <img :src="url_gambar(j.gambar)" width="200" />
                    <p>
                        {{ i+1 }} - {{ j.judul }}
                        <a href="" v-on:click.prevent="$emit('hapuskelas', j.id)">hapus</a>
                        <router-link :to="'/kelas/' +j.id">lihat kelas</router-link>
                    </p>
                </li>
            </ul>
        </template>
        <li v-else>kelas belum tersedia</li>
    </div>
        `,
    data: function(){
        return{
            kelas: {
                judul: '',
                deskripsi: '',
                gambar: ''
            },
            previewimg: "",
            error: {
                judul: '',
                deskripsi: ''

            }
        }
    },
    methods: {
        submitkelas: function(){
            this.error.judul=""
            this.error.deskripsi=""

            if(this.kelas.judul == '') {
                this.error.judul = 'Judul is required'
            }
            if(this.kelas.deskripsi == '') {
                this.error.deskripsi = 'Deskripsi is required'
            }
            if(this.kelas.judul && this.kelas.deskripsi){
                const data = {
                    id: uuidv4(),
                    judul: this.kelas.judul,
                    deskripsi: this.kelas.deskripsi,
                    gambar: this.kelas.gambar
                }
                this.$emit('submitkelas', data)
                
                this.kelas.judul = ""
                this.kelas.deskripsi = ""
                this.kelas.gambar = ""
                this.previewimg = ""
                this.$refs.gambar.value = ""
            }
        },
            upload: function(event){
                const namagambar = (event.target.files[0].name)
                this.kelas.gambar = namagambar
                this.previewimg = URL.createObjectURL(event.target.files[0])
            },
            url_gambar: function(gambar){
                return 'image/' +gambar
            }
        }
    }


Vue.component('header-component', {
    props: ['nama'],
    template: `
    <header>
        <img src="../image/logo.png" width="80" height="80">
        
        <!-- <p>{{pesan}}</p> -->
        <!-- <p v-text="pesan"></p> -->

        <p>{{ 'Hello, '+nama }}</p>
    </header>
    `,
    data: function(){
        return {
            pesan: 'hello, Component!'
        }
    }
})
Vue.component('footer-component', {
    template: `
    <footer>
    <slot></slot>
    </footer>
    `
})