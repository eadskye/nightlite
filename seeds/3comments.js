'use strict';
//TODO seed comments
exports.seed = function(knex, Promise) {

        // Deletes ALL existing entries

        return knex('comments').del()
            .then(function() {
                    return Promise.all([
                                // Inserts seed entries
                                knex('comments').insert({
                                    id: 1,
                                    user_id: 1,
                                    observation_id: 3,
                                    comment: "Stars were beautiful - great evening",
                                    stars: 5
                                }),

                                            knex('comments').insert({
                                                id: 2,
                                                user_id: 4,
                                                observation_id: 3,
                                                comment: "Very cool location to star gaze!",
                                                stars: 5
                                            }),

                                            // Inserts seed entries
                                            knex('comments').insert({
                                                id: 3,
                                                user_id: 2,
                                                observation_id: 3,
                                                comment: "This is a great reccommendation",
                                                stars: 5

                                              }),

                                            knex('comments').insert({
                                                id: 4,
                                                user_id: 2,
                                                observation_id: 1,
                                                comment: "Clear skies, great spot",
                                                stars: 5
                                            }),

                                            knex('comments').insert({
                                                id: 5,
                                                user_id: 1,
                                                observation_id: 1,
                                                comment: "Got some really good photos here!",
                                                stars: 5
                                            }),
                                            knex('comments').insert({
                                                id: 6,
                                                user_id: 5,
                                                observation_id: 1,
                                                comment: "Sounds like a great spot.  Can't wait to go!",
                                                stars: 5
                                            }),
                                            knex('comments').insert({
                                                id: 7,
                                                user_id: 6,
                                                observation_id: 1,
                                                comment: "I went during the day so it was a little hard to see.",
                                                stars: 5
                                            }),
                                            knex('comments').insert({
                                                id: 8,
                                                user_id: 6,
                                                observation_id: 3,
                                                comment: "Great night, great skies.",
                                                stars: 5
                                            }),
                                            knex('comments').insert({
                                                id: 9,
                                                user_id: 3,
                                                observation_id: 2,
                                                comment: "He shined a flashlight at me too...",
                                                stars: 2
                                            }),
                                            knex('comments').insert({
                                                id: 10,
                                                user_id: 4,
                                                observation_id: 2,
                                                comment: "This was kind of a weird spot for star gazing",
                                                stars: 1
                                            }),
                                            knex('comments').insert({
                                                id: 11,
                                                user_id: 2,
                                                observation_id: 2,
                                                comment: "Too much light downtown",
                                                stars: 2
                                            }),
                                            knex('comments').insert({
                                                id: 12,
                                                user_id: 2,
                                                observation_id: 4,
                                                comment: "WOW",
                                                stars: 5
                                            }),
                                            knex('comments').insert({
                                                id: 13,
                                                user_id: 5,
                                                observation_id: 4,
                                                comment: "Really, really beautiful.",
                                                stars: 5
                                            }),
                                            knex('comments').insert({
                                                id: 14,
                                                user_id: 1,
                                                observation_id: 4,
                                                comment: "Some of the best skies I've ever seen.",
                                                stars: 5
                                            }),

                                            knex('comments').insert({
                                                id: 15,
                                                user_id: 3,
                                                observation_id: 5,
                                                comment: "I couldn't see the sky at all.",
                                                stars: 1
                                            }),
                                            knex('comments').insert({
                                                id: 16,
                                                user_id: 4,
                                                observation_id: 5,
                                                comment: "It rained all night long.",
                                                stars: 1
                                            }),
                                             knex('comments').insert({
                                                id: 17,
                                                user_id: 1,
                                                observation_id: 5,
                                                comment: "Dear God, the fog!!",
                                                stars: 1
                                            })
                                        ]);
                                    })
                                    .then(function() {
                                        return knex.raw("SELECT setval('comments_id_seq', (SELECT MAX(id) FROM comments))");
                                      }) ;
                                    };

                            });
