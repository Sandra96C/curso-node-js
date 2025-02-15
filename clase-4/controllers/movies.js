import { validateMovie, validateParcialMovie } from '../schemas/movies.js'
import { MovieModel } from '../models/movie.js';

export class MovieController {
    static async getAll(req, res) {
        const { genre } = req.query
        const movies = await MovieModel.getAll({ genre })
        
        //que es lo que renderiza
        return res.json(movies)    
    }

    static async getById(req, res) {
        const { id } = req.params
        const movie =  await MovieModel.getById({ id })
        if(movie) return res.json(movie)
        
        return res.status(404).json({message: 'Movie not found'})
    }

    static async create(req, res) {
        const result = validateMovie(req.body)

        if(result.error) { //!result.success
            //422
            return res.status(400).json({ error: JSON.parse(result.error.message) })
        }
        const newMovie = await MovieModel.create({ input: result.data })
        res.status(201).json(newMovie)   
    }

    static async delete(req, res) {
        const { id } = req.params
        const result = await MovieModel.delete({ id })

        if(result === false) {
            return res.status(404).json({message: 'Movie not found'})
        }

        return res.json({ message: 'Movie deleted'})
    }

    static async update(req, res) {
        const result = validateParcialMovie(req.body)
    
        if(!result.success) {
            return res.status(400).json({ error: JSON.parse(result.error.message) })
        }

        const { id } = req.params
        const updatedMovie = await MovieModel.update({ id, input: result.data })

        return res.json(updatedMovie)
    }
}