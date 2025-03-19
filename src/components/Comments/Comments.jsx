import { FloatingLabel, Form } from "react-bootstrap"
import "./Comments.scss"
export const Comments = () => <div class="container mb-5 mt-5">
    <div class="card">
        <div class="row">
            <div class="col-md-12">
                <h3 class="text-center mb-5">
                    Комментарии
                </h3>
                <div class="row">
                    <div class="col-md-12">
                        <div class="media mt-4">
                            <img class="mr-3 rounded-circle" alt="Bootstrap Media Preview" src="https://i.imgur.com/xELPaag.jpg" />
                            <div class="media-body">
                                <div class="row">
                                    <div class="col-8 d-flex">
                                        <h5>Shad f</h5>
                                        <span>- 2 hours ago</span>
                                    </div>

                                    <div class="col-4">

                                        <div class="pull-right reply">

                                            <a href="#"><span><i class="fa fa-reply"></i> Ответить</span></a>

                                        </div>

                                    </div>
                                </div>

                                The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33.
                                <div class="media mt-4">
                                    <a class="pr-3" href="#"><img class="rounded-circle" alt="Bootstrap Media Another Preview" src="https://i.imgur.com/nUNhspp.jpg" /></a>
                                    <div class="media-body">

                                        <div class="row">
                                            <div class="col-12 d-flex">
                                                <h5>Andy flowe</h5>
                                                <span>- 5 hours ago</span>
                                            </div>


                                        </div>

                                        Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis.
                                    </div>
                                </div>

                                <div class="media mt-3">
                                    <a class="pr-3" href="#"><img class="rounded-circle" alt="Bootstrap Media Another Preview" src="https://i.imgur.com/HjKTNkG.jpg" /></a>
                                    <div class="media-body">
                                        <div class="row">
                                            <div class="col-12 d-flex">
                                                <h5>Simp f</h5>
                                                <span>- 5 hours ago</span>
                                            </div>


                                        </div>

                                        a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur
                                    </div>
                                </div>


                                <div class="media mt-3">
                                    <a class="pr-3" href="#"><img class="rounded-circle" alt="Bootstrap Media Another Preview" src="https://i.imgur.com/nAcoHRf.jpg" /></a>
                                    <div class="media-body">
                                        <div class="row">
                                            <div class="col-12 d-flex">
                                                <h5>John Smith</h5>
                                                <span>- 4 hours ago</span>
                                            </div>


                                        </div>

                                        the majority have suffered alteration in some form, by injected humour, or randomised words.

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 newComment d-flex gap-3">
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Новый комментарий"
                                className="w-100"
                            >
                                <Form.Control as="textarea" placeholder="Текст комментария..." />
                            </FloatingLabel>
                            <div className="mr-3 pointer d-flex align-items-center"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-send-fill" viewBox="0 0 16 16">
                                <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471z" />
                            </svg></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>