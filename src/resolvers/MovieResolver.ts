import { AppDataSource } from './../data-source';
import {
  Resolver,
  Mutation,
  Arg,
  Int,
  Query,
  InputType,
  Field
} from "type-graphql";
import { Movie } from "../entity/Movie";

const movieRepository = AppDataSource.getRepository(Movie)

@InputType()
class MovieInput {
  @Field()
  title: string;

  @Field(() => Int)
  minutes: number;
}

@InputType()
class MovieUpdateInput {
  @Field(() => String, { nullable: true })
  title?: string;

  @Field(() => Int, { nullable: true })
  minutes?: number;
}

@Resolver()
export class MovieResolver {
  @Mutation(() => Movie)
  async createMovie(@Arg("options", () => MovieInput) options: MovieInput) {
    const movie = await movieRepository.create(options).save();
    return movie;
  }

  @Mutation(() => Boolean)
  async updateMovie(
    @Arg("id", () => Int) id: number,
    @Arg("input", () => MovieUpdateInput) input: MovieUpdateInput
  ) {
    await movieRepository.update({ id }, input);
    return true;
  }

  @Mutation(() => Boolean)
  async deleteMovie(@Arg("id", () => Int) id: number) {
    await movieRepository.delete({ id });
    return true;
  }

  @Query(() => [Movie])
  movies() {
    return Movie.find();
  }
}
