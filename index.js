import express from 'express';
import Joi from 'joi';

const app = express();

app.use(express.json());

const courses = [
    {
        id: 1, course: 'Introduction to Computer Programming'
    },
    {
        id: 2, course: 'Object Oriented Programming I'
    },
    {
        id: 3, course: 'Object Oriented Programming II'
    },
    {
        id: 4, course: 'Data Structures & Algorithms'
    }
]

app.get('/', (req, res) => {
    res.send("Hello World, my people");
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find((c) => c.id === parseInt(req.params.id));

    if(!course) return res.status(404).send("The course was not found");

    res.send(course);
});

app.post('/api/courses', (req, res) => {


    const { error } = validateCourse(req.body)

    if(error) return res.status(400).send(error.details[0].message);

    const course = { id: courses.length + 1, name: req.body.name }
    courses.push(course);
    res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
   const course = courses.find(c => c.id === parseInt(req.params.id));
   if(!course) return res.send('The given course was not found');

    const { error } = validateCourse(req.body)

    if(error) return res.status(400).send(error.details[0].message);

    course.name = req.params.name;

    res.send(course);
});

app.delete('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));

    if(!course) return res.status(400).send("The course was not found");

    const idx = courses.indexOf(course);
    courses.splice(idx, 1);

    res.send(course);
})

const validateCourse = (course) => {
    const schema = {
        name: Joi.string().min(3).required()
    }

    return Joi.validate(course, schema);
}


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
