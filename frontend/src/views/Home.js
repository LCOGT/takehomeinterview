// import store from '../store'
import ai from '../ai';

export default {
  name: 'Home',

  data() {
    const isNumber = (rule, value, callback) => {
      if (parseFloat(value) == value) callback();
      else callback(new Error('must be number'));
    };
    return {
      host: 'localhost:3000',
      columns: [
        { title: 'Name', key: 'name' },
        { title: 'Size', key: 'size' },
        { title: 'Distance', key: 'distance' },
        { title: 'Ordinality', key: 'ordinality' },
      ],
      form: {
        name: '',
        size: null,
        distance: null,
        ordinality: null,
        description: '',
      },


      rule: {
        name: [{ required: true, message: 'Name cannot be empty.', trigger: 'blur' }],
        size: [{ required: true, message: 'Size cannot be empty.', trigger: 'blur' },
          { validator: isNumber, trigger: 'blur' }],
        distance: [{ required: true, message: 'Distance cannot be empty.', trigger: 'blur' },
          { validator: isNumber, trigger: 'blur' }],
        ordinality: [{ required: true, message: 'Ordinality cannot be empty.', trigger: 'blur' },
          { validator: isNumber, trigger: 'blur' }],
      },

    };
  },
  computed: {
    data() { return this.$store.state.data; },

  },

  methods: {
    setHost(){
      console.log('setHost')
      ai.defaults.baseURL = `http://${this.host}/data/`
      this.$Message.success(`Host set to ${this.host}`)
    },

    goDetail(val) {
      console.log(val);
      this.$router.push(`/detail/${val.name}`);
    },


    submit() {
      const f = this.form;
      this.$refs.form.validate(async (valid) => {
        // if (!valid) {
        //   this.$Message.error('Please correct the input form');
        //   return;
        // }
        const postData = {
          name: f.name,
          size: parseFloat(f.size),
          distance: parseFloat(f.distance),
          ordinality: parseFloat(f.ordinality),
          description: f.description,
        };
        try {
          const postRes = await ai.post('/', JSON.stringify(postData));
          this.$Message.success('Submitted');
        } catch (e) {
          console.log(e);
          this.$Message.error(e.response ? e.response.data : 'Unexpected error');
        } finally {
          this.$store.dispatch('load');
        }
        // console.log(postRes)
      });
    },


  },
  created() {
    console.log('mounted');

    if (!this.$store.state.interval) {
      const interval = window.setInterval(() => {
        this.$store.dispatch('load');
      }, 2000);
      this.$store.commit('setInterval', interval);
    }
  },
};
