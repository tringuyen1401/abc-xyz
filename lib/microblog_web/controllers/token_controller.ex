defmodule MicroblogWeb.TokenController do
  use MicroblogWeb, :controller
  alias Microblog.Users.User

  action_fallback MicroblogWeb.FallbackController

  def create(conn, %{"name" => name, "pass" => pass}) do
    with {:ok, %User{} = user} <- Microblog.Users.get_and_auth_user(name, pass) do
      token = Phoenix.Token.sign(conn, "auth token", user.id)
      conn
      |> put_status(:created)
      |> render("token.json", user: user, token: token)
    end
  end
end
